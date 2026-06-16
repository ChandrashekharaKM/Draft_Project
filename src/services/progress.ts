<<<<<<< HEAD
// Progress Service Types

export interface SessionHistory {
  id: string;
  date: string;       // ISO string representation of the session date
  domain: string;     // The topic/domain of the interview (e.g., Frontend, System Design)
  difficulty: string; // The difficulty level (Easy, Medium, Hard)
  score: number;      // Evaluation score from 0 to 100
  duration: string;   // Human-readable duration (e.g., "15 mins")
}

export interface ProgressStatistics {
  totalInterviews: number;
  averageScore: number;
  highestScore: number;
}

// Pre-populated mock history to show immediate performance graphs on first load
const DEFAULT_MOCK_HISTORY: SessionHistory[] = [
  {
    id: "session-1",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    domain: "Frontend Developer",
    difficulty: "Easy",
    score: 70,
    duration: "15 mins",
  },
  {
    id: "session-2",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),  // 7 days ago
    domain: "Frontend Developer",
    difficulty: "Medium",
    score: 75,
    duration: "20 mins",
  },
  {
    id: "session-3",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),  // 4 days ago
    domain: "Fullstack Developer",
    difficulty: "Medium",
    score: 84,
    duration: "25 mins",
  },
  {
    id: "session-4",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),  // 1 day ago
    domain: "System Design",
    difficulty: "Hard",
    score: 92,
    duration: "30 mins",
  }
];

const LOCAL_STORAGE_KEY = "ai_interview_progress";

/**
 * Retrieves the full list of completed mock interview sessions.
 * Automatically initializes localStorage with mock data if no sessions exist.
 */
export const getProgressHistory = (): SessionHistory[] => {
  if (typeof window === "undefined") {
    return DEFAULT_MOCK_HISTORY;
  }

  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedData) {
    // Populate with default mock history for initial demonstration
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_MOCK_HISTORY));
    return DEFAULT_MOCK_HISTORY;
  }

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Failed to parse progress history from localStorage:", error);
    return DEFAULT_MOCK_HISTORY;
  }
};

/**
 * Records a new completed interview session.
 * Saves to localStorage and returns the recorded session with id and date fields populated.
 */
export const trackProgress = async (
  sessionData: Omit<SessionHistory, "id" | "date">
): Promise<SessionHistory> => {
  const newSession: SessionHistory = {
    ...sessionData,
    id: Math.random().toString(36).substring(2, 9),
    date: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const history = getProgressHistory();
    const updatedHistory = [...history, newSession];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  }

  return newSession;
};

/**
 * Computes high-level statistics from the session history array.
 */
export const getStatistics = (history: SessionHistory[]): ProgressStatistics => {
  if (history.length === 0) {
    return {
      totalInterviews: 0,
      averageScore: 0,
      highestScore: 0,
    };
  }

  const totalInterviews = history.length;
  const totalScore = history.reduce((sum, session) => sum + session.score, 0);
  const averageScore = Math.round(totalScore / totalInterviews);
  const highestScore = Math.max(...history.map((session) => session.score));

  return {
    totalInterviews,
    averageScore,
    highestScore,
  };
};

