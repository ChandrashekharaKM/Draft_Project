"use client";
import React, { useState } from 'react';
import { InterviewSetupForm } from '@/components/interview/InterviewSetupForm';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { NextQuestionButton } from '@/components/interview/NextQuestionButton';
import { generateQuestions } from '@/services/interview';
import { AnswerInput } from '@/components/evaluation/AnswerInput';
import { EvaluationPanel } from '@/components/evaluation/EvaluationPanel';
import { evaluateAnswer, EvaluationResult } from '@/services/evaluation';

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  // Candidate 2 state hooks
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  const handleStart = async (domain: string, difficulty: string, resume: File | null, jobDesc: string) => {
=======
  const handleStart = async (domain: string, difficulty: string, _resume: File | null, _jobDesc: string) => {
>>>>>>> a2be87d (fix: resolve typescript linting errors)
    setIsLoading(true);
    // Simulate API call using our service (you could pass resume and jobDesc here in the future)
    const generated = await generateQuestions(domain, difficulty);
    
    // Fallback if not implemented yet
    const dummyQuestions = generated.length > 0 ? generated : [
      `Based on your resume, how would you optimize a slow-loading ${domain} application?`,
      `The job description mentions scaling. Explain a complex technical scaling concept you recently learned.`,
      `What are the most common pitfalls you face at a ${difficulty} level?`
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
    } catch (error) {
      console.error("AI Evaluation failed:", error);
      alert("Failed to evaluate your answer. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Reset Candidate 2 evaluation state for the next question
      setEvaluation(null);
      setSubmittedAnswer('');
    } else {
      alert("Interview Completed! Proceeding to AI Evaluation...");
      // Route to Candidate 3's Score page eventually
    }
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center w-full">
      {!isStarted ? (
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

