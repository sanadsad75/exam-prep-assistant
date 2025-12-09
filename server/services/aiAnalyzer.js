const { generateText } = require('../config/openrouter');

class AIAnalyzer {
  /**
   * Analyze documents and create structured study plan
   */
  async analyzeDocuments(documents, subjectName) {
    const combinedContent = documents
      .filter(doc => !doc.error)
      .map(doc => `=== ${doc.filename} ===\n${doc.content}`)
      .join('\n\n');

    const prompt = `You are an expert educational content analyzer. A student has uploaded study materials for their ${subjectName} exam.

Your task is to analyze these documents and create a comprehensive study plan with the following structure:

1. **Mind Map Structure**: Create a hierarchical mind map of all topics from basic to advanced
2. **Study Flow**: Recommend the optimal order to study these topics
3. **Section Organization**: Break down the content into logical sections with:
   - Section number and title
   - Key concepts covered
   - Difficulty level (Beginner/Intermediate/Advanced)
   - Estimated study time
   - Prerequisites (if any)

Here are the uploaded documents:

${combinedContent}

Please return a JSON response with this exact structure:
{
  "subjectName": "subject name",
  "mindMap": {
    "central": "main topic",
    "branches": [
      {
        "id": "unique_id",
        "name": "branch name",
        "children": [
          {"id": "unique_id", "name": "subtopic", "children": []}
        ]
      }
    ]
  },
  "studyFlow": [
    {
      "order": 1,
      "sectionId": "section_1",
      "title": "section title",
      "reason": "why study this first"
    }
  ],
  "sections": [
    {
      "id": "section_1",
      "number": 1,
      "title": "Section Title",
      "description": "What this section covers",
      "keyPoints": ["point 1", "point 2"],
      "difficulty": "Beginner",
      "estimatedTime": "2 hours",
      "prerequisites": []
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text before or after.`;

    try {
      const responseText = await generateText(prompt, {
        max_tokens: 8000,
        temperature: 0.7,
      });

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw error;
    }
  }

  /**
   * Generate detailed explanation for a specific section
   */
  async generateSectionContent(sectionTitle, originalContent, subjectName) {
    const prompt = `You are an expert ${subjectName} tutor. Create a comprehensive explanation for the topic: "${sectionTitle}"

Use ONLY the information from these uploaded notes:

${originalContent}

Create a detailed explanation with:
1. **Overview**: Brief introduction to the topic
2. **Key Concepts**: Break down main ideas with clear explanations
3. **Important Details**: Detailed explanations of each concept
4. **Visual Aids Needed**: Suggest specific diagrams, images, or videos that would help (describe what they should show)
5. **Summary**: Key takeaways

Return a JSON response:
{
  "title": "section title",
  "overview": "introduction text",
  "concepts": [
    {
      "name": "concept name",
      "explanation": "detailed explanation",
      "examples": ["example 1", "example 2"],
      "visualAidSuggestion": "description of helpful visual"
    }
  ],
  "summary": ["key point 1", "key point 2"],
  "suggestedVisuals": [
    {
      "type": "diagram|image|video",
      "description": "what it should show",
      "searchQuery": "search term for finding this visual"
    }
  ]
}

Base your explanation ONLY on the provided notes. Do not add external information.
IMPORTANT: Return ONLY the JSON object, no additional text.`;

    try {
      const responseText = await generateText(prompt, {
        max_tokens: 6000,
        temperature: 0.7,
      });

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse section content');
    } catch (error) {
      console.error('Section Content Generation Error:', error);
      throw error;
    }
  }

  /**
   * Generate MCQ questions for a section
   */
  async generateMCQ(sectionTitle, sectionContent, numQuestions = 5) {
    const prompt = `Create ${numQuestions} multiple-choice questions based on this content about "${sectionTitle}":

${sectionContent}

Generate questions that test understanding of the key concepts. Use ONLY information from the provided content.

Return a JSON response:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": [
        {"label": "A", "text": "Option A"},
        {"label": "B", "text": "Option B"},
        {"label": "C", "text": "Option C"},
        {"label": "D", "text": "Option D"}
      ],
      "correctAnswer": "A",
      "explanation": "Why this answer is correct"
    }
  ]
}

Make questions clear, relevant, and appropriately challenging.
IMPORTANT: Return ONLY the JSON object, no additional text.`;

    try {
      const responseText = await generateText(prompt, {
        max_tokens: 4000,
        temperature: 0.7,
      });

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse MCQ response');
    } catch (error) {
      console.error('MCQ Generation Error:', error);
      throw error;
    }
  }

  /**
   * Generate comprehensive final exam
   */
  async generateFinalExam(allSections, allContent, numQuestions = 20) {
    const sectionsInfo = allSections.map(s => `${s.number}. ${s.title}`).join('\n');

    const prompt = `Create a comprehensive final exam with ${numQuestions} multiple-choice questions covering all these sections:

${sectionsInfo}

Content:
${allContent}

The exam should:
- Cover all major topics proportionally
- Range from basic to advanced questions
- Test both knowledge and understanding
- Use ONLY information from the provided content

Return a JSON response:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": [
        {"label": "A", "text": "Option A"},
        {"label": "B", "text": "Option B"},
        {"label": "C", "text": "Option C"},
        {"label": "D", "text": "Option D"}
      ],
      "correctAnswer": "A",
      "explanation": "Why this answer is correct"
    }
  ]
}

IMPORTANT: Return ONLY the JSON object with ${numQuestions} questions, no additional text.`;

    try {
      const responseText = await generateText(prompt, {
        max_tokens: 8000,
        temperature: 0.7,
      });

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse final exam response');
    } catch (error) {
      console.error('Final Exam Generation Error:', error);
      throw error;
    }
  }
}

module.exports = new AIAnalyzer();
