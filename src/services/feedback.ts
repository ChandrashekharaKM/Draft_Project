import { EvaluationResult } from "./evaluation";

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
  // Simulate processing delay of 1 second for aggregation
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  // Aggregate scores by averaging
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

  // Consolidate unique strengths and improvements
  const strengthsSet = new Set<string>();
  const improvementsSet = new Set<string>();

  evaluations.forEach(ev => {
    ev.strengths.forEach(s => strengthsSet.add(s));
    ev.improvements.forEach(imp => improvementsSet.add(imp));
  });

  // Convert sets to arrays
  let strengths = Array.from(strengthsSet);
  let improvements = Array.from(improvementsSet);

  // Fallbacks if empty
  if (strengths.length === 0) {
    strengths.push("Successfully submitted all response answers.");
  }
  if (improvements.length === 0) {
    improvements.push("Perfect marks on basic guidelines. Try answering more challenging system scenarios.");
  }

  // Limit to top 4 strengths and improvements for readable UI
  strengths = strengths.slice(0, 4);
  improvements = improvements.slice(0, 4);

  // Generate customized suggestions based on score thresholds
  const suggestions: FeedbackSuggestion[] = [];

  // Suggestion for Technical Accuracy
  if (technicalAccuracyScore < 80) {
    suggestions.push({
      category: "Technical Depth",
      description: `Your average technical accuracy score was ${technicalAccuracyScore}%. You need to incorporate more domain-specific concepts and underlying engineering mechanics in your responses.`,
      actionableStep: "When answering, explicitly mention frameworks, API patterns, architectural constraints, database index types, or specific rendering strategies (e.g. Server Components, static generation) depending on the question."
    });
  } else {
    suggestions.push({
      category: "Advanced System Design",
      description: "You demonstrated solid technical accuracy. To reach an elite level, start articulating edge cases, scale limits, and reliability tradeoffs (like CAP theorem nuances or fallback strategies).",
      actionableStep: "In your next responses, focus on system performance at scale: mention throughput/latency limits, rate limiting, and cache invalidation strategies."
    });
  }

  // Suggestion for Communication
  if (communicationScore < 80) {
    suggestions.push({
      category: "Response Structure",
      description: `Your communication score of ${communicationScore}% indicates that some answers lacked structured delivery or depth.`,
      actionableStep: "Practice using frameworks like STAR (Situation, Task, Action, Result) or CARL (Context, Action, Result, Learning) to organize your responses so they flow logically and are easy to follow."
    });
  } else {
    suggestions.push({
      category: "Leadership & Collaboration",
      description: "Your communication style is highly effective, structured, and easy to understand.",
      actionableStep: "In future interviews, weave in stories highlighting mentorship, leading technical alignment (e.g. RFC reviews), and managing expectations of cross-functional partners."
    });
  }

  // Suggestion for Relevance
  if (relevanceScore < 85) {
    suggestions.push({
      category: "Direct Answering Style",
      description: "Sometimes the response drifted slightly from the core problem statement or lacked sufficient elaboration on the core ask.",
      actionableStep: "Take a moment to map out your answer's key components first. Start with a direct 1-sentence answer addressing the core problem, then build out the supporting technical detail."
    });
  } else {
    suggestions.push({
      category: "Contextual Alignment",
      description: "Your responses are highly aligned to the questions asked.",
      actionableStep: "Ensure you tailor your answers to the specific size and stage of the target company (e.g., speed and scrappiness for early-stage startups vs. scalability and process for enterprise)."
    });
  }

  return {
    overallScore,
    relevanceScore,
    communicationScore,
    technicalAccuracyScore,
    strengths,
    improvements,
    suggestions
  };
};
