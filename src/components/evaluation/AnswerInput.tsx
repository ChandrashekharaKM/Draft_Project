"use client";
import React, { useState, useEffect, useRef } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

const SAMPLE_TRANSCRIPTS = [
  "To optimize a slow-loading web application, I would first audit it using Lighthouse to identify bottlenecks. I'd implement code splitting and lazy loading for routes and heavy components. I'd optimize images using modern formats like WebP, implement effective browser caching, and use a Content Delivery Network to serve static assets closer to users. Finally, I'd analyze the main bundle size to eliminate unused dependencies and optimize database queries using indexing.",
  "In my last project, I faced a scaling challenge where database read latency spike under load. I resolved this by introducing a Redis caching layer for read-heavy operations, which reduced database load by sixty percent. I also optimized database query execution plans, added indexes to high-frequency columns, and implemented connection pooling in the backend service. This drastically improved overall API response times.",
  "I believe communication is crucial for engineering teams. To align technical decisions, I start by writing RFC documents explaining the trade-offs and proposals. I then organize collaborative review sessions where teammates can critique the architecture. This builds consensus, ensures high code quality, and helps prevent technical debt down the line."
];

export const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit, isLoading }) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Character and word counts
  const characterCount = answer.length;
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  // Cleanup recording timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    
    // Start counting up
    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 4) {
          // Auto-stop and transcribe after 5 seconds
          stopRecording(true);
          return 5;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = (autoTranscribe = false) => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecording(false);

    if (autoTranscribe) {
      // Pick a random mock transcript
      const randomIndex = Math.floor(Math.random() * SAMPLE_TRANSCRIPTS.length);
      const transcript = SAMPLE_TRANSCRIPTS[randomIndex];
      setAnswer(transcript);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isLoading) {
      onSubmit(answer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#131B2F]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/4 -mt-20 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-white tracking-wide">Your Answer</h4>
            <p className="text-sm text-slate-400 mt-1">Provide your answer below by typing or simulating voice dictation.</p>
          </div>

          {/* Voice transcription simulation controller */}
          <div className="flex items-center">
            {isRecording ? (
              <div className="flex items-center space-x-4 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-bold text-red-400 font-mono">{formatTime(recordingSeconds)}</span>
                
                {/* Visualizer bars */}
                <div className="flex items-end space-x-1 h-5 px-1">
                  <div className="w-1 bg-red-400 rounded-full animate-[bounce_0.8s_infinite] h-4"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-[bounce_0.5s_infinite] h-5"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-[bounce_0.9s_infinite] h-3"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-[bounce_0.6s_infinite] h-5"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-[bounce_0.7s_infinite] h-4"></div>
                </div>

                <button
                  type="button"
                  onClick={() => stopRecording(true)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Stop & Transcribe
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 active:scale-95 disabled:opacity-50 text-indigo-300 font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
                <span>Simulate Voice Input</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isLoading || isRecording}
            placeholder="Type your response here..."
            className="w-full min-h-[180px] p-5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-y font-medium leading-relaxed disabled:opacity-60"
          ></textarea>
        </div>

        {/* Counts & Submit Action */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          {/* Metrics */}
          <div className="flex items-center space-x-6 text-sm font-semibold text-slate-400">
            <div>
              Words: <span className={wordCount > 0 ? "text-indigo-400" : ""}>{wordCount}</span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <div>
              Characters: <span className={characterCount > 0 ? "text-indigo-400" : ""}>{characterCount}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || isRecording || !answer.trim()}
            className="w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <span>Submit Answer</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
