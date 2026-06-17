"use server";
import { GoogleGenAI } from '@google/genai';

export interface EvaluationResult {
  score: number;
  relevance: number;
  communication: number;
  technicalAccuracy: number;
  strengths: string[];
  improvements: string[];
}

export const evaluateAnswer = async (answer: string): Promise<EvaluationResult> => {
  const trimmed = answer.trim();

  if (trimmed.length === 0) {
    return {
      score: 0,
      relevance: 0,
      communication: 0,
      technicalAccuracy: 0,
      strengths: ["Direct and concise format potential."],
      improvements: ["Please provide an answer to get feedback."]
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are an expert technical interviewer evaluating a candidate's answer.
Answer: "${trimmed}"

Evaluate the answer and return a JSON object with the following fields:
- "score": Overall score (0-100)
- "relevance": Relevance score (0-100)
- "communication": Communication score (0-100)
- "technicalAccuracy": Technical accuracy score (0-100)
- "strengths": Array of up to 3 strings highlighting the strengths of the answer.
- "improvements": Array of up to 3 strings highlighting areas for improvement.

Provide only the JSON object, without any markdown formatting like \`\`\`json.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let text = response.text || "{}";
    if (text.startsWith("\`\`\`json")) {
      text = text.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    }
    
    const evalData = JSON.parse(text);
    return {
      score: evalData.score || 0,
      relevance: evalData.relevance || 0,
      communication: evalData.communication || 0,
      technicalAccuracy: evalData.technicalAccuracy || 0,
      strengths: evalData.strengths || ["Successfully submitted answer for review."],
      improvements: evalData.improvements || ["Consider providing more detail next time."]
    };
  } catch (error) {
    console.error("AI Evaluation failed:", error);
    // Fallback if AI fails
    return {
      score: 50,
      relevance: 50,
      communication: 50,
      technicalAccuracy: 50,
      strengths: ["Answer received"],
      improvements: ["Evaluation service unavailable"]
    };
  }
};
