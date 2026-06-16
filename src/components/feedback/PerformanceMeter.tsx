"use client";
import React, { useEffect, useState } from 'react';

interface PerformanceMeterProps {
  relevanceScore: number;
  communicationScore: number;
  technicalAccuracyScore: number;
}

export const PerformanceMeter: React.FC<PerformanceMeterProps> = ({
  relevanceScore,
  communicationScore,
  technicalAccuracyScore
}) => {
  const [widths, setWidths] = useState({ relevance: 0, communication: 0, technical: 0 });

  useEffect(() => {
    // Animate the loading of horizontal progress bars
    const timer = setTimeout(() => {
      setWidths({
        relevance: relevanceScore,
        communication: communicationScore,
        technical: technicalAccuracyScore
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [relevanceScore, communicationScore, technicalAccuracyScore]);

  const getMetricRating = (val: number) => {
    if (val >= 85) return { text: "Mastered", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (val >= 70) return { text: "Solid", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" };
    return { text: "Needs Focus", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
  };

  const metrics = [
    {
      name: "Relevance",
      score: relevanceScore,
      width: widths.relevance,
      description: "Direct alignment to the core problem and requirements.",
      colorClass: "from-emerald-500 to-teal-400",
      rating: getMetricRating(relevanceScore)
    },
    {
      name: "Communication",
      score: communicationScore,
      width: widths.communication,
      description: "Structure, clarity, and articulation of the answer.",
      colorClass: "from-purple-500 to-indigo-400",
      rating: getMetricRating(communicationScore)
    },
    {
      name: "Technical Accuracy",
      score: technicalAccuracyScore,
      width: widths.technical,
      description: "Use of correct methodologies, terminology, and system mechanics.",
      colorClass: "from-sky-500 to-blue-400",
      rating: getMetricRating(technicalAccuracyScore)
    }
  ];

  return (
    <div className="w-full bg-[#131B2F]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-center h-full hover:border-indigo-500/20 transition-all duration-300">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Detailed Analysis</span>
          <h3 className="text-xl font-bold text-white tracking-wide">Performance Breakdown</h3>
        </div>

        <div className="space-y-6">
          {metrics.map((metric, i) => (
            <div key={i} className="space-y-2.5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-sm font-bold text-white tracking-wide">{metric.name}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wide ${metric.rating.color}`}>
                      {metric.rating.text}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{metric.description}</p>
                </div>
                <span className="text-base font-extrabold text-white font-mono bg-white/2 border border-white/5 px-2.5 py-1 rounded-xl">
                  {metric.score}%
                </span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                <div 
                  className={`bg-gradient-to-r ${metric.colorClass} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.width}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
