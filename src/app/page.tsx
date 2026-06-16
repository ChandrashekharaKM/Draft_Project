import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-24 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Professional AI Resume & <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Document Suite
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
          Tailor resumes, practice mock interviews, and evaluate your skills completely client-side in seconds.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="w-full flex justify-center">
        <Link href="/interview" className="block w-full max-w-md group">
          <div className="bg-[#131B2F] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
            
            <div className="flex items-start space-x-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 01-2-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">Mock Interview</h3>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/20">AI Powered</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Optimize your interview skills against target job requirements and resolve AI interview questionnaires.
                </p>
                <div className="flex items-center text-indigo-400 text-sm font-semibold group-hover:text-indigo-300 transition-colors">
                  Start Session 
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
