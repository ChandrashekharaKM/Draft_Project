"use client";
import React, { useState } from 'react';
import { InterviewSetupForm } from '@/components/interview/InterviewSetupForm';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { NextQuestionButton } from '@/components/interview/NextQuestionButton';
import { generateQuestions } from '@/services/interview';
import { AnswerInput } from '@/components/evaluation/AnswerInput';
import { EvaluationPanel } from '@/components/evaluation/EvaluationPanel';
import { evaluateAnswer, EvaluationResult } from '@/services/evaluation';

// Candidate 3 Imports
import { ScoreCard } from '@/components/feedback/ScoreCard';
import { PerformanceMeter } from '@/components/feedback/PerformanceMeter';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import { generateFeedback, FeedbackReport } from '@/services/feedback';

// Dashboard Progress Tracking
import { trackProgress } from '@/services/progress';

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Candidate 2 state hooks
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  // Candidate 3 state hooks
  const [domain, setDomain] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>([]);
  const [isAggregating, setIsAggregating] = useState(false);
  const [feedbackReport, setFeedbackReport] = useState<FeedbackReport | null>(null);

  const handleStart = async (domainVal: string, difficultyVal: string, _resume: File | null, _jobDesc: string) => {
    setIsLoading(true);
    setDomain(domainVal);
    setDifficulty(difficultyVal);
    
    // Reset session states
    setAnswers([]);
    setEvaluations([]);
    setFeedbackReport(null);
    setCurrentIndex(0);

    const generated = await generateQuestions(domainVal, difficultyVal);
    
    const dummyQuestions = generated.length > 0 ? generated : [
      `Based on your resume, how would you optimize a slow-loading ${domainVal} application?`,
      `The job description mentions scaling. Explain a complex technical scaling concept you recently learned.`,
      `What are the most common pitfalls you face at a ${difficultyVal} level?`
    ];
    setQuestions(dummyQuestions);
    setIsStarted(true);
    setIsLoading(false);
  };

  const handleAnswerSubmit = async (answer: string) => {
    setIsEvaluating(true);
    setSubmittedAnswer(answer);
    try {
      const result = await evaluateAnswer(answer);
      setEvaluation(result);
      
      // Keep track of answers & evaluations for Candidate 3 aggregation
      setAnswers(prev => [...prev, answer]);
      setEvaluations(prev => [...prev, result]);
    } catch (error) {
      console.error("AI Evaluation failed:", error);
      alert("Failed to evaluate your answer. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Reset Candidate 2 evaluation state for the next question
      setEvaluation(null);
      setSubmittedAnswer('');
    } else {
      // Last question completed! Aggregating final feedback report
      setIsAggregating(true);
      try {
        const report = await generateFeedback(evaluations);
        setFeedbackReport(report);

        // Save session data using trackProgress for the progress dashboard
        await trackProgress({
          domain: domain || 'General Technical',
          difficulty: difficulty || 'Medium',
          score: report.overallScore,
          duration: `${Math.max(5, questions.length * 5)} mins`
        });

        // Save detailed session data to localStorage for history & statistics (Candidate 4 support)
        const savedSessionsStr = typeof window !== 'undefined' ? localStorage.getItem('interview_sessions') || '[]' : '[]';
        const sessions = JSON.parse(savedSessionsStr);
        const newSession = {
          id: `sess_${Date.now()}`,
          date: new Date().toISOString(),
          domain: domain || 'General Technical',
          difficulty: difficulty || 'Medium',
          overallScore: report.overallScore,
          relevanceScore: report.relevanceScore,
          communicationScore: report.communicationScore,
          technicalAccuracyScore: report.technicalAccuracyScore,
          questionsCount: questions.length,
          questions,
          answers,
          evaluations
        };
        sessions.push(newSession);
        if (typeof window !== 'undefined') {
          localStorage.setItem('interview_sessions', JSON.stringify(sessions));
        }
      } catch (error) {
        console.error("Aggregation compilation failed:", error);
        alert("Failed to compile final evaluation report.");
      } finally {
        setIsAggregating(false);
      }
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setQuestions([]);
    setCurrentIndex(0);
    setEvaluation(null);
    setSubmittedAnswer('');
    setAnswers([]);
    setEvaluations([]);
    setFeedbackReport(null);
    setDomain('');
    setDifficulty('');
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center w-full">
      {/* Progress Steps Indicator */}
      <div className="flex items-center space-x-4 mb-10 text-sm font-extrabold uppercase tracking-wider relative z-10 select-none">
        <div className={`flex items-center space-x-2 ${!isStarted && !feedbackReport ? 'text-indigo-400' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${!isStarted && !feedbackReport ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-white/5'}`}>1</span>
          <span>Setup</span>
        </div>
        <span className="text-slate-700">➔</span>
        <div className={`flex items-center space-x-2 ${isStarted && !feedbackReport && !isAggregating ? 'text-indigo-400' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${isStarted && !feedbackReport && !isAggregating ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-white/5'}`}>2</span>
          <span>Interview</span>
        </div>
        <span className="text-slate-700">➔</span>
        <div className={`flex items-center space-x-2 ${feedbackReport || isAggregating ? 'text-indigo-400' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${feedbackReport || isAggregating ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-white/5'}`}>3</span>
          <span>AI Report</span>
        </div>
      </div>

      {/* Main UI Flow router */}
      {isAggregating ? (
        <div className="w-full max-w-lg flex flex-col items-center justify-center bg-[#131B2F]/80 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
          <p className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Compiling Overall Metrics...
          </p>
          <p className="text-sm text-slate-400 text-center mt-2">
            Synthesizing key strengths, growth areas, and generating your custom growth roadmap.
          </p>
        </div>
      ) : feedbackReport ? (
        // Score & Feedback Dashboard
        <div className="w-full space-y-10 animate-fade-in">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-extrabold">Evaluation Report</span>
            </h1>
            <p className="text-base text-slate-400 font-medium">
              We&apos;ve analyzed your responses. Review your overall scores, core performance metrics, and growth roadmap.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ScoreCard 
              score={feedbackReport.overallScore} 
              domain={domain}
              difficulty={difficulty}
              questionsCount={questions.length}
            />
            <PerformanceMeter 
              relevanceScore={feedbackReport.relevanceScore}
              communicationScore={feedbackReport.communicationScore}
              technicalAccuracyScore={feedbackReport.technicalAccuracyScore}
            />
          </div>

          {/* Qualitative strengths and Roadmap feedback */}
          <FeedbackCard 
            strengths={feedbackReport.strengths}
            improvements={feedbackReport.improvements}
            suggestions={feedbackReport.suggestions}
          />

          {/* Reset / Actions Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleReset}
              className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 hover:border-indigo-500/20 active:scale-98 transition-all shadow-xl text-md flex items-center space-x-2 cursor-pointer"
            >
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12"></path>
              </svg>
              <span>Start New Interview</span>
            </button>
          </div>
        </div>
      ) : !isStarted ? (
        <div className="w-full flex flex-col items-center animate-fade-in-up">
          <div className="text-center max-w-2xl mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Interviewer</span>
            </h1>
            <p className="text-lg text-slate-400 font-light">
              Upload your resume and the target job description. Our AI will generate a tailored mock interview just for you.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center bg-[#131B2F]/80 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Analyzing Profile & Generating Questions...</p>
            </div>
          ) : (
            <InterviewSetupForm onStart={handleStart} />
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center space-y-10 animate-fade-in mt-10">
          <QuestionCard 
            question={questions[currentIndex]} 
            questionNumber={currentIndex + 1} 
            totalQuestions={questions.length} 
          />
          
          {/* Answer Input and Evaluation Panel Integration */}
          <div className="w-full">
            {evaluation ? (
              <div className="w-full space-y-6 animate-fade-in">
                <div className="bg-[#131B2F]/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Your Answer</span>
                  <p className="text-slate-300 italic font-medium leading-relaxed">&quot;{submittedAnswer}&quot;</p>
                </div>
                <EvaluationPanel evaluation={evaluation} />
              </div>
            ) : (
              <AnswerInput onSubmit={handleAnswerSubmit} isLoading={isEvaluating} />
            )}
          </div>

          {/* Navigation - Only allow moving forward once evaluation is available */}
          {evaluation && (
            <div className="w-full flex justify-end animate-fade-in">
              <NextQuestionButton 
                onClick={handleNext} 
                isLast={currentIndex === questions.length - 1} 
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
