import React from 'react';
import { Brain, Clock, ListChecks } from 'lucide-react';
import type { Question } from '../types/screening';

interface QuestionsListProps {
  questions: Question[];
}

export function QuestionsList({ questions }: QuestionsListProps) {
  if (!questions.length) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif">Generated Questions</h2>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-medium capitalize" 
                    style={{ 
                      backgroundColor: getTypeColor(question.type).bg,
                      color: getTypeColor(question.type).text 
                    }}>
                {question.type.replace('_', ' ')}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{question.time_limit} minutes</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-900 mb-6 leading-relaxed">{question.question}</p>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <ListChecks className="w-5 h-5 mr-2" />
                <h4 className="font-medium">Evaluation Criteria</h4>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                {question.evaluation_criteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTypeColor(type: string): { bg: string; text: string } {
  const colors = {
    experience: { bg: '#F3F4F6', text: '#111827' },
    technical: { bg: '#F3F4F6', text: '#111827' },
    critical_thinking: { bg: '#F3F4F6', text: '#111827' },
    cultural: { bg: '#F3F4F6', text: '#111827' },
    motivation: { bg: '#F3F4F6', text: '#111827' }
  };
  
  return colors[type as keyof typeof colors];
}