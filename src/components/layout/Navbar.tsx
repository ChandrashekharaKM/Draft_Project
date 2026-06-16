import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-wide text-white">HoldMy<span className="text-indigo-400">Resume</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-lg p-1 border border-white/10">
          <Link href="/" className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span>All Tools</span>
          </Link>
          <Link href="/interview" className="px-4 py-2 text-slate-400 hover:text-white rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
             <span>Mock Interview</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
