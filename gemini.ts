import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: MODEL_NAME });
  }

  async generateQuestions(jobDetails: any): Promise<any> {
    try {
      const prompt = this.constructPrompt(jobDetails);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json\n/g, '').replace(/```/g, '');
      return JSON.parse(text);
    } catch (error: any) {
      console.error('Detailed error:', error);
      throw new Error(
        `Failed to generate screening questions: ${error.message || 'Unknown error'}`
      );
    }
  }

  private constructPrompt(jobDetails: any): string {
    return `Generate 5 screening questions for a ${jobDetails.title} position at ${jobDetails.company}.
    The questions should follow this structure:
    1. Experience question about ${jobDetails.title}
    2. Technical question related to ${jobDetails.responsibilities}
    3. Critical thinking question about prioritization
    4. Cultural fit question for ${jobDetails.company}
    5. Motivation question about growth at ${jobDetails.company}

    Format the response as a JSON object with this structure:
    {
      "questions": [
        {
          "type": "experience|technical|critical_thinking|cultural|motivation",
          "question": "The actual question text",
          "evaluation_criteria": ["criterion1", "criterion2", "criterion3"],
          "time_limit": timeInMinutes
        }
      ]
    }`;
  }
}