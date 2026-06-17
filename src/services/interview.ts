"use server";
import { GoogleGenAI } from '@google/genai';

export const generateQuestions = async (domain: string, difficulty: string, numQuestions: number = 3) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert technical interviewer. Generate exactly ${numQuestions} distinct, challenging, and relevant interview questions for a ${difficulty} level candidate in ${domain}. Provide the response as a JSON array of strings, where each string is a question. Do not include any other text or markdown wrappers.`,
    });
    
    let text = response.text || "[]";
    if (text.startsWith("\`\`\`json")) {
      text = text.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    }
    
    const questions: string[] = JSON.parse(text);
    return questions;
  } catch (error) {
    console.error("Failed to generate questions with Gemini:", error);
    return [];
  }
};
