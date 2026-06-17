import { SessionHistory } from "@/services/progress";

interface ProgressChartProps {
  history: SessionHistory[];
}

export default function ProgressChart({ history }: ProgressChartProps) {
  if (history.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-lg border border-zinc-200 bg-white p-6 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800">
        No interview sessions available to map progress.
      </div>
    );
  }

  // Chart configuration
  const svgWidth = 600;
  const svgHeight = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const points = history.map((session, index) => {
    const x =
      history.length > 1
        ? paddingLeft + (index / (history.length - 1)) * chartWidth
        : paddingLeft + chartWidth / 2;
    const y = paddingTop + chartHeight - (session.score / 100) * chartHeight;
    return { x, y, score: session.score };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  const areaPath =
    points.length > 0
      ? `${paddingLeft},${paddingTop + chartHeight} ` +
        points.map((p) => `${p.x},${p.y}`).join(" ") +
        ` ${points[points.length - 1].x},${paddingTop + chartHeight}`
      : "";

  const yGridValues = [0, 25, 50, 75, 100];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 w-full">
      <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50 mb-4">
        Score Improvement Graph
      </h3>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height={svgHeight}
          className="overflow-visible min-w-[500px]"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y axis numbers */}
          {yGridValues.map((value) => {
            const y = paddingTop + chartHeight - (value / 100) * chartHeight;
            return (
              <g key={value}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#e4e4e7"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="dark:stroke-zinc-800"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  className="fill-zinc-400 dark:fill-zinc-500 font-medium"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Shaded Area */}
          {points.length > 0 && (
            <polygon points={areaPath} fill="url(#chartGradient)" />
          )}

          {/* Score Line */}
          {points.length > 0 && (
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              points={linePath}
            />
          )}

          {/* Dots and Labels */}
          {points.map((p, index) => (
            <g key={index}>
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="2"
                className="dark:stroke-zinc-900"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize="11"
                className="font-bold fill-zinc-800 dark:fill-zinc-100"
              >
                {p.score}%
              </text>
              <text
                x={p.x}
                y={paddingTop + chartHeight + 20}
                textAnchor="middle"
                fontSize="10"
                className="fill-zinc-400 dark:fill-zinc-500 font-medium"
              >
                {new Date(history[index].date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
