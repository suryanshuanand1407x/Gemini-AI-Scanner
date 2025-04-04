import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { JobForm } from './components/JobForm';
import { QuestionsList } from './components/QuestionsList';
import { GeminiService } from './services/gemini';
import type { JobDetails, Question } from './types/screening';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: JobDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const geminiService = new GeminiService();
      const result = await geminiService.generateQuestions(data);
      setQuestions(result.questions);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-gray-900" />
            <span className="font-semibold text-xl">AI Screening</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose mb-12">
          <h1 className="text-4xl font-serif mb-4 tracking-tight">
            Create tailored screening questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Leverage AI to generate comprehensive screening questions for your job openings, 
            ensuring you find the perfect candidate.
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <QuestionsList questions={questions} />
      </main>

      <footer className="border-t border-gray-100 mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-500">
            Powered by Google Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;