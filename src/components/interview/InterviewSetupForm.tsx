"use client";
import React, { useState, useRef } from 'react';

interface SetupFormProps {
  onStart: (domain: string, difficulty: string, resume: File | null, jobDesc: string, numQuestions: number) => void;
}

export const InterviewSetupForm: React.FC<SetupFormProps> = ({ onStart }) => {
  const [domain, setDomain] = useState('Software Engineering');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }
    if (!jobDesc.trim()) {
      alert("Please provide the job description.");
      return;
    }
    onStart(domain, difficulty, resume, jobDesc, numQuestions);
  };

  return (
    <div className="bg-[#131B2F]/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center relative z-10">Configure Mock Interview</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Domain */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Domain Focus</label>
            <select 
              value={domain} 
              onChange={(e) => setDomain(e.target.value)}
              className="w-full border border-white/10 bg-white/5 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white font-medium outline-none"
            >
              <option className="bg-[#131B2F]">Software Engineering</option>
              <option className="bg-[#131B2F]">Frontend Development</option>
              <option className="bg-[#131B2F]">Backend Development</option>
              <option className="bg-[#131B2F]">Data Science</option>
              <option className="bg-[#131B2F]">Product Management</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Difficulty</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-white/10 bg-white/5 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white font-medium outline-none"
            >
              <option className="bg-[#131B2F]">Easy (Junior)</option>
              <option className="bg-[#131B2F]">Medium (Mid-Level)</option>
              <option className="bg-[#131B2F]">Hard (Senior)</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Questions</label>
            <input 
              type="number"
              min="1"
              max="50"
              value={numQuestions} 
              onChange={(e) => setNumQuestions(Number(e.target.value) || 1)}
              className="w-full border border-white/10 bg-white/5 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white font-medium outline-none"
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Upload Resume (Required)</label>
          <div 
            className={`border-2 border-dashed ${resume ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/20 bg-white/5'} rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-white/10 transition-all duration-300`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />
            {resume ? (
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-indigo-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-sm text-indigo-200 font-medium">{resume.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <span className="text-sm text-slate-400">Click to upload your resume (PDF/DOCX)</span>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Job Description (Required)</label>
          <textarea 
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here to tailor the AI questions..."
            className="w-full border border-white/10 bg-white/5 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white font-medium outline-none min-h-[120px] resize-y"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-1 text-lg flex items-center justify-center space-x-2"
        >
          <span>Generate Interview Session</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </button>
      </form>
    </div>
  );
};
