import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const MilestoneBarChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="w-full h-72 flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200 px-6 text-center">
        <div>
          <p className="text-sm font-semibold text-slate-700">No roadmap activity yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Your phase completion totals will appear here when your roadmap is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="phase"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0]?.payload;
              return (
                <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                  <p className="font-bold">{point?.phase}</p>
                  <p className="text-brand-300 mt-1">
                    Completed: {point?.completed} / {point?.total} milestones
                  </p>
                </div>
              );
            }}
          />
          <Bar
            dataKey="completed"
            name="Completed milestones"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MilestoneBarChart;
