import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSession, getFinalExam } from '../api/api';

function FinalExamPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExamData();
  }, [sessionId]);

  const loadExamData = async () => {
    try {
      setLoading(true);

      // Load session
      const sessionResponse = await getSession(sessionId);
      setSession(sessionResponse.session);

      // Load final exam
      const examResponse = await getFinalExam(sessionId);
      setExam(examResponse.exam);
    } catch (err) {
      console.error('Failed to load exam:', err);
      setError('Failed to load exam');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answer
      });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    exam.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: exam.questions.length,
      percentage: Math.round((correct / exam.questions.length) * 100)
    };
  };

  const nextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your final exam...</p>
        </div>
      </div>
    );
  }

  if (error || !exam || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Exam not found'}</p>
          <button
            onClick={() => navigate(`/dashboard/${sessionId}`)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Exam start screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Final Comprehensive Exam
                </h1>
                <p className="text-xl text-gray-600">
                  {session.subjectName}
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Exam Instructions:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    This exam contains {exam.questions.length} multiple-choice questions
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Questions cover all sections from your study materials
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    You can navigate between questions before submitting
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    All questions must be answered before submission
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    You'll receive detailed feedback after submission
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">
                      {exam.questions.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Questions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">
                      {session.analysis.sections.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Sections Covered</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setExamStarted(true)}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Start Exam
                </button>
                <button
                  onClick={() => navigate(`/dashboard/${sessionId}`)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = exam.questions[currentQuestion];
  const score = showResults ? calculateScore() : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Final Exam</h1>
              <p className="text-gray-600 mt-1">{session.subjectName}</p>
            </div>
            {!showResults && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                    navigate(`/dashboard/${sessionId}`);
                  }
                }}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Exit Exam
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {exam.questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    {Object.keys(selectedAnswers).length} / {exam.questions.length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question Navigation */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exam.questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm ${
                        index === currentQuestion
                          ? 'bg-primary-600 text-white'
                          : selectedAnswers[q.id]
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {question.question}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option) => {
                    const isSelected = selectedAnswers[question.id] === option.label;
                    return (
                      <div
                        key={option.label}
                        onClick={() => handleAnswerSelect(question.id, option.label)}
                        className={`quiz-option ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                            isSelected ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900">{option.label}.</span>{' '}
                            <span className="text-gray-700">{option.text}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentQuestion === exam.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < exam.questions.length}
                    className="px-8 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Next
                  </button>
                )}
              </div>

              {Object.keys(selectedAnswers).length < exam.questions.length && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  {exam.questions.length - Object.keys(selectedAnswers).length} question(s) remaining
                </p>
              )}
            </>
          ) : (
            <>
              {/* Final Results */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                  score.percentage >= 80 ? 'bg-green-100' :
                  score.percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {score.percentage >= 80 ? (
                    <svg className="h-12 w-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : score.percentage >= 60 ? (
                    <svg className="h-12 w-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-12 w-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-2">Exam Complete!</h2>
                <p className="text-gray-600 mb-8">Here are your results:</p>

                <div className="bg-gray-50 rounded-lg p-8 mb-6">
                  <div className="text-6xl font-bold text-primary-600 mb-3">
                    {score.percentage}%
                  </div>
                  <p className="text-xl text-gray-700 mb-2">
                    {score.correct} out of {score.total} correct
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        score.percentage >= 80 ? 'bg-green-500' :
                        score.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {score.percentage >= 80 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <p className="text-green-800 font-semibold text-lg">
                      Excellent work! You've demonstrated strong mastery of the material.
                    </p>
                  </div>
                ) : score.percentage >= 60 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <p className="text-yellow-800 font-semibold text-lg">
                      Good effort! Review the sections below and consider retaking for a better score.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-red-800 font-semibold text-lg">
                      Keep studying! Review the material thoroughly and try again.
                    </p>
                  </div>
                )}
              </div>

              {/* Detailed Results */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Question-by-Question Review
                </h3>

                <div className="space-y-8">
                  {exam.questions.map((q, index) => {
                    const userAnswer = selectedAnswers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;

                    return (
                      <div key={q.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start mb-4">
                          <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {index + 1}
                          </span>
                          <div className="ml-3 flex-1">
                            <p className="text-lg font-medium text-gray-900">
                              {q.question}
                            </p>
                          </div>
                        </div>

                        <div className="ml-13 space-y-2">
                          {q.options.map((option) => {
                            const isUserAnswer = userAnswer === option.label;
                            const isCorrectAnswer = q.correctAnswer === option.label;

                            return (
                              <div
                                key={option.label}
                                className={`p-4 rounded-lg ${
                                  isCorrectAnswer ? 'bg-green-50 border-2 border-green-300' :
                                  isUserAnswer && !isCorrect ? 'bg-red-50 border-2 border-red-300' :
                                  'bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <span className="font-semibold">{option.label}.</span> {option.text}
                                {isCorrectAnswer && (
                                  <span className="ml-3 text-green-700 font-bold">✓ Correct Answer</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-3 text-red-700 font-bold">✗ Your Answer</span>
                                )}
                              </div>
                            );
                          })}

                          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <p className="text-sm text-gray-800">
                              <span className="font-semibold text-blue-900">Explanation:</span> {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700"
                >
                  Retake Exam
                </button>
                <button
                  onClick={() => navigate(`/dashboard/${sessionId}`)}
                  className="px-8 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalExamPage;
