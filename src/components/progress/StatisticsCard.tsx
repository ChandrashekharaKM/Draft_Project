import { ProgressStatistics } from "@/services/progress";

interface StatisticsCardProps {
  statistics: ProgressStatistics;
}

export default function StatisticsCard({ statistics }: StatisticsCardProps) {
  const statsList = [
    {
      label: "Total Interviews Completed",
      value: statistics.totalInterviews,
      description: "Sessions recorded in this profile",
      icon: (
        <svg className="h-6 w-6 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      label: "Average Score",
      value: `${statistics.averageScore}%`,
      description: "Overall candidate performance score",
      icon: (
        <svg className="h-6 w-6 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
    },
    {
      label: "Highest Score",
      value: `${statistics.highestScore}%`,
      description: "Your peak performance session",
      icon: (
        <svg className="h-6 w-6 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 w-full">
      {statsList.map((stat, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-lg bg-white p-6 shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              <h4 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">{stat.value}</h4>
            </div>
            <div className="rounded-md bg-zinc-50 p-2 dark:bg-zinc-800">{stat.icon}</div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
