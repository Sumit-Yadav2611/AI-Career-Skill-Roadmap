import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const defaultSkillData = [
  { subject: 'Frontend', current: 85, required: 90, fullMark: 100 },
  { subject: 'Backend', current: 75, required: 85, fullMark: 100 },
  { subject: 'Database', current: 60, required: 80, fullMark: 100 },
  { subject: 'DevOps & Cloud', current: 45, required: 75, fullMark: 100 },
  { subject: 'DSA & Core', current: 70, required: 80, fullMark: 100 },
  { subject: 'System Design', current: 50, required: 70, fullMark: 100 },
];

export const SkillRadarChart = ({ data = defaultSkillData }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                    <p className="font-bold">{payload[0]?.payload?.subject}</p>
                    <p className="text-emerald-400 mt-1">
                      Current Score: {payload[0]?.value}%
                    </p>
                    {payload[1] && (
                      <p className="text-indigo-300">
                        Target Industry: {payload[1]?.value}%
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Radar
            name="Your Skills"
            dataKey="current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.35}
          />
          <Radar
            name="Target Benchmark"
            dataKey="required"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SkillRadarChart;
