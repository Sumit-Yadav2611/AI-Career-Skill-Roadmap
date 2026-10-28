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

const defaultActivityData = [
  { week: 'W1', completed: 3, target: 4 },
  { week: 'W2', completed: 5, target: 4 },
  { week: 'W3', completed: 4, target: 4 },
  { week: 'W4', completed: 6, target: 5 },
  { week: 'W5', completed: 2, target: 4 },
  { week: 'W6', completed: 5, target: 5 },
];

export const MilestoneBarChart = ({ data = defaultActivityData }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                    <p className="font-bold">{payload[0]?.payload?.week}</p>
                    <p className="text-brand-400 mt-1">
                      Completed: {payload[0]?.value} Milestones
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="completed"
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
