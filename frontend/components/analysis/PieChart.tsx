"use client";

export interface PieSlice {
  label: string;
  count: number;
  color: string;
}

export function PieChart({slices}: {slices: PieSlice[]}) {
  const cx = 90;
  const cy = 90;
  const r = 72;
  const innerR = 38;
  const total = slices.reduce((s, sl) => s + sl.count, 0);

  let cursor = -Math.PI / 2;
  const paths = slices
    .filter((sl) => sl.count > 0)
    .map((sl) => {
      const angle = (sl.count / total) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(cursor);
      const y1 = cy + r * Math.sin(cursor);
      cursor += angle;
      const x2 = cx + r * Math.cos(cursor);
      const y2 = cy + r * Math.sin(cursor);
      const large = angle > Math.PI ? 1 : 0;
      // inner arc (donut)
      const ix1 = cx + innerR * Math.cos(cursor);
      const iy1 = cy + innerR * Math.sin(cursor);
      const ix2 = cx + innerR * Math.cos(cursor - angle);
      const iy2 = cy + innerR * Math.sin(cursor - angle);
      return {
        d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`,
        color: sl.color,
        label: sl.label,
        count: sl.count,
      };
    });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
      <svg viewBox="0 0 180 180" className="w-full max-w-[180px] shrink-0">
        {total === 0 ? (
          <circle cx={cx} cy={cy} r={r} fill="#f3f4f6" />
        ) : paths.length === 1 ? (
          // Single slice covering 100% — SVG arcs can't represent a full circle,
          // so draw a solid donut ring directly
          <>
            <circle cx={cx} cy={cy} r={r} fill={paths[0].color} />
            <circle cx={cx} cy={cy} r={innerR} fill="white" />
          </>
        ) : (
          paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill={p.color}
              stroke="white"
              strokeWidth="2"
            />
          ))
        )}
        {/* centre */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="700"
          fill="currentColor"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fill="#6b7280"
        >
          signals
        </text>
      </svg>

      {/* legend */}
      <div className="flex flex-col gap-3 w-full">
        {slices.map((sl) => (
          <div key={sl.label} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{backgroundColor: sl.color}}
            />
            <span className="text-sm font-medium flex-1">{sl.label}</span>
            <span className="text-sm font-bold" style={{color: sl.color}}>
              {sl.count}
            </span>
            {/* <span className="text-xs text-muted-foreground">
              {total > 0 ? `${Math.round((sl.count / total) * 100)}%` : "—"}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
}
