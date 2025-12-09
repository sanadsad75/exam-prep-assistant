const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Recommended free models for this project (as of 2024)
const FREE_MODELS = {
  // Meta's Llama models (Free tier)
  'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct:free',

  // Google's Gemma (Free tier)
  'gemma-7b': 'google/gemma-7b-it:free',

  // Mistral models (Free tier)
  'mistral-7b': 'mistralai/mistral-7b-instruct:free',

  // Nous Research (Free)
  'nous-capybara': 'nousresearch/nous-capybara-7b:free',

  // Qwen models (Free)
  'qwen-2-7b': 'qwen/qwen-2-7b-instruct:free',
};

// Default model to use (you can change this)
const DEFAULT_MODEL = process.env.AI_MODEL || FREE_MODELS['mistral-7b'];

/**
 * Call OpenRouter API with chat completion
 */
async function createChatCompletion(messages, options = {}) {
  try {
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: options.model || DEFAULT_MODEL,
        messages: messages,
        max_tokens: options.max_tokens || 8000,
        temperature: options.temperature || 0.7,
        top_p: options.top_p || 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
          'X-Title': 'Exam Prep Assistant',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw new Error(`AI API Error: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Helper function to create a simple user message and get response
 */
async function generateText(prompt, options = {}) {
  const messages = [
    {
      role: 'user',
      content: prompt
    }
  ];

  const result = await createChatCompletion(messages, options);
  return result.choices[0].message.content;
}

module.exports = {
  createChatCompletion,
  generateText,
  FREE_MODELS,
  DEFAULT_MODEL,
};
