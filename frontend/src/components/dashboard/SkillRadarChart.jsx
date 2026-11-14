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

export const SkillRadarChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="w-full h-72 flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200 px-6 text-center">
        <div>
          <p className="text-sm font-semibold text-slate-700">Not enough skill data yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Add skills with proficiency levels to your profile and select a target career to see this comparison.
          </p>
        </div>
      </div>
    );
  }

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
              if (!active || !payload?.length) return null;
              const point = payload[0]?.payload;
              return (
                <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                  <p className="font-bold">{point?.subject}</p>
                  <p className="text-brand-300 mt-1">Profile-listed level: {point?.current}%</p>
                  <p className="text-emerald-400">Role requirement: {point?.required}%</p>
                </div>
              );
            }}
          />
          <Radar
            name="Profile-listed skills"
            dataKey="current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.35}
          />
          <Radar
            name="Role requirement"
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
