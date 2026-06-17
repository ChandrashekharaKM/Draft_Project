"use server";
import { EvaluationResult } from "./evaluation";
import { GoogleGenAI } from '@google/genai';

export interface FeedbackSuggestion {
  category: string;
  description: string;
  actionableStep: string;
}

export interface FeedbackReport {
  overallScore: number;
  relevanceScore: number;
  communicationScore: number;
  technicalAccuracyScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: FeedbackSuggestion[];
}

export const generateFeedback = async (evaluations: EvaluationResult[]): Promise<FeedbackReport> => {
  if (!evaluations || evaluations.length === 0) {
    return {
      overallScore: 0,
      relevanceScore: 0,
      communicationScore: 0,
      technicalAccuracyScore: 0,
      strengths: ["No interview answers evaluated yet."],
      improvements: ["Complete the interview to receive areas of improvement."],
      suggestions: []
    };
  }

  // Aggregate scores
  const count = evaluations.length;
  let totalScore = 0;
  let totalRelevance = 0;
  let totalCommunication = 0;
  let totalTechAccuracy = 0;

  evaluations.forEach(ev => {
    totalScore += ev.score;
    totalRelevance += ev.relevance;
    totalCommunication += ev.communication;
    totalTechAccuracy += ev.technicalAccuracy;
  });

  const overallScore = Math.round(totalScore / count);
  const relevanceScore = Math.round(totalRelevance / count);
  const communicationScore = Math.round(totalCommunication / count);
  const technicalAccuracyScore = Math.round(totalTechAccuracy / count);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are a career coach reviewing an interview performance.
The candidate achieved these average scores:
- Overall: ${overallScore}%
- Relevance: ${relevanceScore}%
- Communication: ${communicationScore}%
- Technical Accuracy: ${technicalAccuracyScore}%

Based on these scores and an aggregation of their performance, generate a JSON object with:
- "strengths": Array of up to 4 strings summarizing their key strengths.
- "improvements": Array of up to 4 strings summarizing areas of improvement.
- "suggestions": Array of exactly 3 objects, each with:
    - "category": e.g. "Technical Depth", "Response Structure", etc.
    - "description": A short sentence describing their performance in this category.
    - "actionableStep": A concrete actionable tip for improvement.

Provide only the JSON object, without any markdown formatting like \`\`\`json.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let text = response.text || "{}";
    if (text.startsWith("\`\`\`json")) {
      text = text.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    }
    
    const feedbackData = JSON.parse(text);
    return {
      overallScore,
      relevanceScore,
      communicationScore,
      technicalAccuracyScore,
      strengths: feedbackData.strengths || ["Successfully submitted all response answers."],
      improvements: feedbackData.improvements || ["Focus on advanced system scenarios next time."],
      suggestions: feedbackData.suggestions || []
    };
  } catch (error) {
    console.error("AI Feedback Generation failed:", error);
    // Fallback
    return {
      overallScore,
      relevanceScore,
      communicationScore,
      technicalAccuracyScore,
      strengths: ["Completed the interview."],
      improvements: ["Feedback generation unavailable."],
      suggestions: []
    };
  }
};
