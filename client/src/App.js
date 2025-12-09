import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SectionPage from './pages/SectionPage';
import QuizPage from './pages/QuizPage';
import FinalExamPage from './pages/FinalExamPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/:sessionId" element={<DashboardPage />} />
          <Route path="/section/:sessionId/:sectionId" element={<SectionPage />} />
          <Route path="/quiz/:sessionId/:sectionId" element={<QuizPage />} />
          <Route path="/final-exam/:sessionId" element={<FinalExamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
