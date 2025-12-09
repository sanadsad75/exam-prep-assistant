import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSession } from '../api/api';
import MindMap from '../components/MindMap';

function DashboardPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const response = await getSession(sessionId);
      setSession(response.session);
    } catch (err) {
      console.error('Failed to load session:', err);
      setError('Failed to load study session');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study plan...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Session not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { analysis, subjectName } = session;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subjectName}</h1>
              <p className="text-gray-600 mt-1">Your personalized study plan</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              New Session
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('mindmap')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'mindmap'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mind Map
              </button>
              <button
                onClick={() => setActiveTab('studyflow')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'studyflow'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Study Flow
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'sections'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Sections
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Study Plan Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-primary-50 rounded-lg p-6">
                    <div className="text-primary-600 text-3xl font-bold">
                      {analysis.sections.length}
                    </div>
                    <div className="text-gray-700 mt-1">Sections</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="text-green-600 text-3xl font-bold">
                      {analysis.sections.reduce((sum, s) => {
                        const time = parseInt(s.estimatedTime) || 0;
                        return sum + time;
                      }, 0)}h
                    </div>
                    <div className="text-gray-700 mt-1">Total Study Time</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="text-purple-600 text-3xl font-bold">
                      {analysis.sections.length * 5}+
                    </div>
                    <div className="text-gray-700 mt-1">Practice Questions</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Quick Start</h3>
                  <p className="text-gray-600 mb-4">
                    Begin with the recommended study order or explore sections individually.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        const firstSection = analysis.studyFlow[0];
                        navigate(`/section/${sessionId}/${firstSection.sectionId}`);
                      }}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-semibold"
                    >
                      Start First Section
                    </button>
                    <button
                      onClick={() => navigate(`/final-exam/${sessionId}`)}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                    >
                      Take Final Exam
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mind Map Tab */}
            {activeTab === 'mindmap' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Topic Mind Map</h2>
                <p className="text-gray-600 mb-6">
                  Visual representation of all topics and their relationships
                </p>
                <MindMap mindMapData={analysis.mindMap} />
              </div>
            )}

            {/* Study Flow Tab */}
            {activeTab === 'studyflow' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Recommended Study Order</h2>
                <p className="text-gray-600 mb-6">
                  Follow this order for optimal learning progression
                </p>
                <div className="space-y-4">
                  {analysis.studyFlow.map((item, index) => {
                    const section = analysis.sections.find(s => s.id === item.sectionId);
                    return (
                      <div
                        key={item.sectionId}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/section/${sessionId}/${item.sectionId}`)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {item.order}
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mt-1">{item.reason}</p>
                            {section && (
                              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {section.estimatedTime}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  section.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                  section.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {section.difficulty}
                                </span>
                              </div>
                            )}
                          </div>
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Sections Tab */}
            {activeTab === 'sections' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">All Sections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.sections.map((section) => (
                    <div
                      key={section.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/section/${sessionId}/${section.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-primary-600 font-bold text-sm">
                            Section {section.number}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 mt-1">
                            {section.title}
                          </h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          section.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          section.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {section.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {section.estimatedTime}
                        </span>
                        <span className="text-primary-600 font-medium">
                          Start Learning →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
