import { SessionHistory } from "@/services/progress";

interface HistoryTableProps {
  history: SessionHistory[];
}

export default function HistoryTable({ history }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-zinc-200 bg-white p-6 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800">
        No past interview sessions found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 w-full">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
          Interview Session History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-zinc-500 dark:text-zinc-400">
          <thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <tr>
              <th scope="col" className="px-6 py-4">Domain / Topic</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4">Difficulty</th>
              <th scope="col" className="px-6 py-4 text-center">Score</th>
              <th scope="col" className="px-6 py-4">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {history.map((session) => (
              <tr
                key={session.id}
                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white whitespace-nowrap">
                  {session.domain}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(session.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      session.difficulty === "Easy"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : session.difficulty === "Medium"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                    }`}
                  >
                    {session.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap font-semibold text-zinc-900 dark:text-white">
                  {session.score}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {session.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
