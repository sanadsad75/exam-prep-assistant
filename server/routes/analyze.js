const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const documentParser = require('../utils/documentParser');
const aiAnalyzer = require('../services/aiAnalyzer');
const fs = require('fs');
const path = require('path');

// Store study sessions in memory (in production, use a database)
const studySessions = new Map();

/**
 * Upload and analyze documents
 */
router.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const { subjectName } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    if (!subjectName) {
      return res.status(400).json({ error: 'Subject name is required' });
    }

    // Parse all uploaded documents
    console.log('Parsing documents...');
    const parseResult = await documentParser.parseMultipleFiles(req.files);
    const parsedDocuments = parseResult.documents;
    const uploadedImages = parseResult.images;

    // Check for parsing errors
    const failedDocs = parsedDocuments.filter(doc => doc.error);
    if (failedDocs.length > 0) {
      console.warn('Some documents failed to parse:', failedDocs);
    }

    // Analyze with AI
    console.log('Analyzing with AI...');
    const analysis = await aiAnalyzer.analyzeDocuments(parsedDocuments, subjectName);

    // Generate session ID
    const sessionId = Date.now().toString();

    // Store session data
    studySessions.set(sessionId, {
      id: sessionId,
      subjectName,
      documents: parsedDocuments,
      images: uploadedImages,
      analysis,
      createdAt: new Date(),
      sectionDetails: new Map(),
      quizzes: new Map()
    });

    res.json({
      success: true,
      sessionId,
      subjectName,
      analysis,
      filesProcessed: req.files.length,
      filesFailed: failedDocs.length
    });

  } catch (error) {
    console.error('Upload and analysis error:', error);
    res.status(500).json({
      error: 'Failed to process documents',
      message: error.message
    });
  }
});

/**
 * Get session data
 */
router.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = studySessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json({
    success: true,
    session: {
      id: session.id,
      subjectName: session.subjectName,
      analysis: session.analysis,
      createdAt: session.createdAt
    }
  });
});

module.exports = router;
module.exports.studySessions = studySessions;
