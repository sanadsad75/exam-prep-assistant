import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSession, getSectionContent } from '../api/api';

function SectionPage() {
  const { sessionId, sectionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [sectionInfo, setSectionInfo] = useState(null);
  const [content, setContent] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSectionData();
  }, [sessionId, sectionId]);

  const loadSectionData = async () => {
    try {
      setLoading(true);

      // Load session to get section info
      const sessionResponse = await getSession(sessionId);
      setSession(sessionResponse.session);

      const section = sessionResponse.session.analysis.sections.find(
        s => s.id === sectionId
      );
      setSectionInfo(section);

      // Load detailed content
      const contentResponse = await getSectionContent(sessionId, sectionId);
      setContent(contentResponse.content);
      setImages(contentResponse.images || []);
    } catch (err) {
      console.error('Failed to load section:', err);
      setError('Failed to load section content');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading section content...</p>
        </div>
      </div>
    );
  }

  if (error || !content || !sectionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Section not found'}</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Section {sectionInfo.number}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sectionInfo.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  sectionInfo.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {sectionInfo.difficulty}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{sectionInfo.title}</h1>
              <p className="text-gray-600 mt-1">{sectionInfo.description}</p>
            </div>
            <button
              onClick={() => navigate(`/dashboard/${sessionId}`)}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{content.overview}</p>
          </div>

          {/* Uploaded Images */}
          {images && images.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Visual Reference Materials
              </h2>
              <p className="text-gray-600 mb-4">
                Images from your uploaded materials to help visualize the concepts
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={`http://localhost:5000${image.url}`}
                      alt={image.filename}
                      className="w-full h-64 object-contain bg-gray-50"
                      loading="lazy"
                    />
                    <div className="p-3 bg-gray-50">
                      <p className="text-sm text-gray-700 font-medium truncate">
                        {image.filename}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(image.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Concepts */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Concepts</h2>
            <div className="space-y-8">
              {content.concepts.map((concept, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {concept.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {concept.explanation}
                  </p>

                  {/* Examples */}
                  {concept.examples && concept.examples.length > 0 && (
                    <div className="bg-primary-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {concept.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Visual Aid Suggestion */}
                  {concept.visualAidSuggestion && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            <span className="font-semibold">Visual Aid Suggestion:</span>{' '}
                            {concept.visualAidSuggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Visual Aids */}
          {content.suggestedVisuals && content.suggestedVisuals.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Recommended Visual Aids
              </h2>
              <p className="text-gray-600 mb-4">
                Search for these visuals to enhance your understanding:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.suggestedVisuals.map((visual, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {visual.type === 'diagram' && (
                          <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                        {visual.type === 'image' && (
                          <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {visual.type === 'video' && (
                          <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="text-xs font-semibold text-primary-600 uppercase">
                          {visual.type}
                        </span>
                        <p className="text-sm text-gray-700 mt-1">{visual.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Search: "{visual.searchQuery}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary</h2>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Takeaways:</h3>
              <ul className="space-y-2">
                {content.summary.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Test Your Knowledge
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to check your understanding? Take the quiz for this section.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/quiz/${sessionId}/${sectionId}`)}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 font-semibold flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Take Section Quiz
              </button>
              <button
                onClick={() => navigate(`/dashboard/${sessionId}`)}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold"
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

export default SectionPage;
