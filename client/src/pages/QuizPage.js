import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSession, getSectionQuiz } from '../api/api';

function QuizPage() {
  const { sessionId, sectionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [sectionInfo, setSectionInfo] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuizData();
  }, [sessionId, sectionId]);

  const loadQuizData = async () => {
    try {
      setLoading(true);

      // Load session to get section info
      const sessionResponse = await getSession(sessionId);
      setSession(sessionResponse.session);

      const section = sessionResponse.session.analysis.sections.find(
        s => s.id === sectionId
      );
      setSectionInfo(section);

      // Load quiz
      const quizResponse = await getSectionQuiz(sessionId, sectionId);
      setQuiz(quizResponse.quiz);
    } catch (err) {
      console.error('Failed to load quiz:', err);
      setError('Failed to load quiz');
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
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
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
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !sectionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Quiz not found'}</p>
          <button
            onClick={() => navigate(`/section/${sessionId}/${sectionId}`)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Section
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const score = showResults ? calculateScore() : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Section {sectionInfo.number} Quiz
              </h1>
              <p className="text-gray-600 mt-1">{sectionInfo.title}</p>
            </div>
            <button
              onClick={() => navigate(`/section/${sessionId}/${sectionId}`)}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    {Object.keys(selectedAnswers).length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  ></div>
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

                {currentQuestion === quiz.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
                    className="px-8 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
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

              {Object.keys(selectedAnswers).length < quiz.questions.length && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Please answer all questions before submitting
                </p>
              )}
            </>
          ) : (
            <>
              {/* Results */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  score.percentage >= 70 ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {score.percentage >= 70 ? (
                    <svg className="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-10 w-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                <p className="text-gray-600 mb-6">Here's how you did:</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-5xl font-bold text-primary-600 mb-2">
                    {score.percentage}%
                  </div>
                  <p className="text-gray-700">
                    {score.correct} out of {score.total} correct
                  </p>
                </div>

                {score.percentage >= 70 ? (
                  <p className="text-green-600 font-semibold mb-6">
                    Great job! You've mastered this section.
                  </p>
                ) : (
                  <p className="text-yellow-600 font-semibold mb-6">
                    Consider reviewing the material and trying again.
                  </p>
                )}
              </div>

              {/* Detailed Results */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Question Review
                </h3>

                <div className="space-y-6">
                  {quiz.questions.map((q, index) => {
                    const userAnswer = selectedAnswers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;

                    return (
                      <div key={q.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start mb-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {index + 1}
                          </span>
                          <p className="ml-3 text-gray-900 font-medium flex-1">
                            {q.question}
                          </p>
                        </div>

                        <div className="ml-11 space-y-2">
                          {q.options.map((option) => {
                            const isUserAnswer = userAnswer === option.label;
                            const isCorrectAnswer = q.correctAnswer === option.label;

                            return (
                              <div
                                key={option.label}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer ? 'bg-green-50 border border-green-200' :
                                  isUserAnswer && !isCorrect ? 'bg-red-50 border border-red-200' :
                                  'bg-gray-50'
                                }`}
                              >
                                <span className="font-semibold">{option.label}.</span> {option.text}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-2 text-red-600 font-semibold">✗ Your answer</span>
                                )}
                              </div>
                            );
                          })}

                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Explanation:</span> {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => navigate(`/section/${sessionId}/${sectionId}`)}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Back to Section
                </button>
                <button
                  onClick={() => navigate(`/dashboard/${sessionId}`)}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
