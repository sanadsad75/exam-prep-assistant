import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadFiles = async (files, subjectName) => {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  formData.append('subjectName', subjectName);

  const response = await api.post('/analyze/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getSession = async (sessionId) => {
  const response = await api.get(`/analyze/session/${sessionId}`);
  return response.data;
};

export const getSectionContent = async (sessionId, sectionId) => {
  const response = await api.get(`/study/section/${sessionId}/${sectionId}`);
  return response.data;
};

export const getSectionQuiz = async (sessionId, sectionId, numQuestions = 5) => {
  const response = await api.get(`/study/quiz/${sessionId}/${sectionId}?numQuestions=${numQuestions}`);
  return response.data;
};

export const getFinalExam = async (sessionId, numQuestions = 20) => {
  const response = await api.get(`/study/final-exam/${sessionId}?numQuestions=${numQuestions}`);
  return response.data;
};

export default api;
