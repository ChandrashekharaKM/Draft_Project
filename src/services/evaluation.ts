<<<<<<< HEAD
// Evaluation Service TypeScript Interface
export interface EvaluationResult {
  score: number;
  relevance: number;
  communication: number;
  technicalAccuracy: number;
  strengths: string[];
  improvements: string[];
}

export const evaluateAnswer = async (answer: string): Promise<EvaluationResult> => {
  // Simulate AI processing delay of 1.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const trimmed = answer.trim();

  // If the answer is completely empty, return empty scores
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

  // Dynamic evaluation simulation based on the content of the answer
  // Search for core technical keywords to approximate AI analysis
  const techKeywords = [
    "optimize", "performance", "component", "state", "react", "next", 
    "cache", "database", "query", "index", "scale", "latency", 
    "render", "lazy", "api", "security", "asynchronous", "middleware"
  ];
  
  const foundKeywords = techKeywords.filter(keyword => 
    trimmed.toLowerCase().includes(keyword)
  );

  const wordCount = trimmed.split(/\s+/).filter(w => w.length > 0).length;

  // 1. Technical Accuracy based on key terminology
  const keywordScoreBonus = Math.min(foundKeywords.length * 6, 25);
  const technicalAccuracy = Math.min(65 + keywordScoreBonus + Math.floor(Math.random() * 8), 100);

  // 2. Communication based on answer length and structure (simulating clarity)
  let communication = 70;
  if (wordCount >= 50) communication += 15;
  else if (wordCount >= 20) communication += 8;
  
  // Add some randomness
  communication = Math.min(communication + Math.floor(Math.random() * 10), 100);

  // 3. Relevance based on key terms and length
  let relevance = 75;
  if (wordCount > 30) relevance += 10;
  if (foundKeywords.length > 2) relevance += 5;
  relevance = Math.min(relevance + Math.floor(Math.random() * 8), 100);

  // 4. Overall Score (Average of the three scores)
  const score = Math.round((technicalAccuracy + communication + relevance) / 3);

  // Compile Dynamic Strengths
  const strengths: string[] = [];
  if (wordCount >= 40) {
    strengths.push("Provided a detailed explanation with good length and depth.");
  } else {
    strengths.push("Gave a concise, direct answer to the question.");
  }

  if (foundKeywords.length >= 3) {
    strengths.push(`Incorporated relevant technical terminology (e.g., ${foundKeywords.slice(0, 2).join(", ")}).`);
  } else {
    strengths.push("Stated the core resolution strategy clearly.");
  }

  if (communication >= 85) {
    strengths.push("Demonstrated structured thinking and clear communication.");
  }

  // Compile Dynamic Improvements
  const improvements: string[] = [];
  if (wordCount < 40) {
    improvements.push("Elaborate further with concrete details to substantiate your answer.");
  }
  
  if (foundKeywords.length < 3) {
    improvements.push("Incorporate more technical keywords and detail the system components involved.");
  }

  if (technicalAccuracy < 80) {
    improvements.push("Elaborate on the underlying mechanics of your solution (e.g. database indexing, rendering hooks).");
  }

  if (!trimmed.toLowerCase().includes("example")) {
    improvements.push("Include a real-world scenario or past project experience to illustrate your answer.");
  }

  // Fallbacks if lists are empty
  if (strengths.length === 0) strengths.push("Successfully submitted answer for review.");
  if (improvements.length === 0) improvements.push("Perfect response. Try checking edge cases for the given scenario.");

=======
// Evaluation Service
export const evaluateAnswer = async (_answer: string) => {
  // TODO: implement AI evaluation
>>>>>>> a2be87d (fix: resolve typescript linting errors)
  return {
    score,
    relevance,
    communication,
    technicalAccuracy,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3)
  };
};
