const express = require('express');
const router = express.Router();
const aiAnalyzer = require('../services/aiAnalyzer');
const { studySessions } = require('./analyze');

/**
 * Get detailed content for a specific section
 */
router.get('/section/:sessionId/:sectionId', async (req, res) => {
  try {
    const { sessionId, sectionId } = req.params;
    const session = studySessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if we already generated this section
    if (session.sectionDetails.has(sectionId)) {
      return res.json({
        success: true,
        content: session.sectionDetails.get(sectionId),
        images: session.images || []
      });
    }

    // Find the section
    const section = session.analysis.sections.find(s => s.id === sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Get original content
    const combinedContent = session.documents
      .filter(doc => !doc.error && !doc.isImage)
      .map(doc => doc.content)
      .join('\n\n');

    // Generate detailed content
    console.log(`Generating content for section: ${section.title}`);
    const detailedContent = await aiAnalyzer.generateSectionContent(
      section.title,
      combinedContent,
      session.subjectName
    );

    // Cache the result
    session.sectionDetails.set(sectionId, detailedContent);

    res.json({
      success: true,
      content: detailedContent,
      images: session.images || []
    });

  } catch (error) {
    console.error('Section content error:', error);
    res.status(500).json({
      error: 'Failed to generate section content',
      message: error.message
    });
  }
});

/**
 * Generate MCQ quiz for a section
 */
router.get('/quiz/:sessionId/:sectionId', async (req, res) => {
  try {
    const { sessionId, sectionId } = req.params;
    const { numQuestions = 5 } = req.query;
    const session = studySessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if quiz already exists
    if (session.quizzes.has(sectionId)) {
      return res.json({
        success: true,
        quiz: session.quizzes.get(sectionId)
      });
    }

    // Get section content
    let sectionContent = session.sectionDetails.get(sectionId);

    if (!sectionContent) {
      // Generate section content first
      const section = session.analysis.sections.find(s => s.id === sectionId);
      const combinedContent = session.documents
        .filter(doc => !doc.error)
        .map(doc => doc.content)
        .join('\n\n');

      sectionContent = await aiAnalyzer.generateSectionContent(
        section.title,
        combinedContent,
        session.subjectName
      );
      session.sectionDetails.set(sectionId, sectionContent);
    }

    // Generate quiz
    const section = session.analysis.sections.find(s => s.id === sectionId);
    const contentText = JSON.stringify(sectionContent);

    console.log(`Generating quiz for section: ${section.title}`);
    const quiz = await aiAnalyzer.generateMCQ(
      section.title,
      contentText,
      parseInt(numQuestions)
    );

    // Cache the quiz
    session.quizzes.set(sectionId, quiz);

    res.json({
      success: true,
      quiz
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      error: 'Failed to generate quiz',
      message: error.message
    });
  }
});

/**
 * Generate final comprehensive exam
 */
router.get('/final-exam/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { numQuestions = 20 } = req.query;
    const session = studySessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if final exam already exists
    if (session.finalExam) {
      return res.json({
        success: true,
        exam: session.finalExam
      });
    }

    // Get all content
    const allContent = session.documents
      .filter(doc => !doc.error)
      .map(doc => doc.content)
      .join('\n\n');

    console.log('Generating final exam...');
    const finalExam = await aiAnalyzer.generateFinalExam(
      session.analysis.sections,
      allContent,
      parseInt(numQuestions)
    );

    // Cache the exam
    session.finalExam = finalExam;

    res.json({
      success: true,
      exam: finalExam
    });

  } catch (error) {
    console.error('Final exam generation error:', error);
    res.status(500).json({
      error: 'Failed to generate final exam',
      message: error.message
    });
  }
});

module.exports = router;
