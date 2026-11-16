import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  RefreshCw,
  AlertCircle,
  Cpu,
} from 'lucide-react';
import { useRoadmap } from '../hooks/useRoadmap';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const RoadmapPage = () => {
  const {
    roadmap,
    activeCareer,
    careers,
    activeCareerId,
    selectTargetCareer,
    toggleMilestone,
    loading,
    error,
  } = useRoadmap();

  const isHighDemand =
    error && (error.toLowerCase().includes('demand') || error.toLowerCase().includes('busy'));

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-red-950 border-t-red-500 rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-400 font-semibold flex items-center gap-2">
          <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
          Synthesizing AI learning roadmap via Gemini microservice...
        </p>
      </div>
    );
  }

  const phases = roadmap?.phases || [];
  const allMilestones = phases.flatMap((phase) => phase.milestones || []);
  const completedMilestones = allMilestones.filter((m) => m.status === 'completed').length;
  const completion = allMilestones.length
    ? Math.round((completedMilestones / allMilestones.length) * 100)
    : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E202B] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              AI Dynamic Career Roadmap
            </span>
            <Badge variant="rose" size="sm">Gemini AI</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {roadmap?.careerTitle || activeCareer?.title || 'Personalized Career Roadmap'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Purely synthesized using AI microservice APIs based on your skills and chosen engineering path.
          </p>
        </div>

        {/* Progress Pill */}
        <div className="bg-[#12131A] p-3.5 rounded-2xl border border-[#222432] shadow-lg flex items-center gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Roadmap Progress
            </span>
            <span className="text-xl font-black text-red-500">{completion}%</span>
            <span className="block text-[10px] text-slate-400">
              {completedMilestones} of {allMilestones.length} milestones
            </span>
          </div>
          <div className="w-24">
            <ProgressBar value={completion} size="sm" color="rose" />
          </div>
        </div>
      </div>

      {/* Target role selector bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#12131A] border border-[#222432]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span className="text-xs font-semibold text-slate-300">Target Role:</span>
          <select
            value={activeCareerId || ''}
            onChange={(e) => selectTargetCareer(e.target.value)}
            className="rounded-xl border border-[#2B2C3C] bg-[#181924] px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-red-600 cursor-pointer"
          >
            {careers.map((career) => (
              <option key={career.id} value={career.id} className="bg-[#12131A] text-white">
                {career.title}
              </option>
            ))}
          </select>
        </div>
        <Badge variant="rose" size="sm">
          {roadmap?.durationWeeks || 12}-Week AI Curriculum
        </Badge>
      </div>

      {/* High Demand / Error Notice */}
      {error && (
        <div className="rounded-2xl border border-red-800/80 bg-red-950/60 p-4 text-xs text-red-300 flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="font-bold text-white">
                {isHighDemand ? 'Model is in high demand, try later' : error}
              </p>
              <p className="text-[11px] text-red-300 mt-0.5">
                The AI service endpoint is currently handling high request volumes. Please retry in a moment.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => selectTargetCareer(activeCareerId)}
            className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-full px-4 py-1.5 text-xs shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry AI
          </Button>
        </div>
      )}

      {/* Roadmap Phases List */}
      <div className="space-y-8">
        {phases.map((phase, phaseIdx) => (
          <section key={phase.id || phaseIdx} className="space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#1E202B] pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
                  {phase.duration || `Phase ${phaseIdx + 1}`}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {phase.title}
                </h3>
                {phase.description && (
                  <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                )}
              </div>
              <Badge variant="rose" size="sm">
                Stage {String(phaseIdx + 1).padStart(2, '0')}
              </Badge>
            </div>

            <div className="space-y-3">
              {(phase.milestones || []).map((milestone) => {
                const isCompleted = milestone.status === 'completed';
                return (
                  <Card
                    key={milestone.id}
                    className={`p-4 sm:p-5 transition-all bg-[#12131A] border rounded-2xl ${
                      isCompleted
                        ? 'border-emerald-800/60 bg-[#0E1B15]'
                        : 'border-[#222432] hover:border-red-600/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          onClick={() => toggleMilestone(milestone.id, !isCompleted)}
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                              : 'border-2 border-[#2F3144] text-transparent hover:border-red-500'
                          }`}
                          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className={`text-sm font-bold ${
                                isCompleted ? 'text-slate-500 line-through' : 'text-white'
                              }`}
                            >
                              {milestone.title}
                            </h4>
                            <Badge
                              variant={isCompleted ? 'emerald' : 'rose'}
                              size="sm"
                            >
                              {isCompleted ? 'Completed' : 'Pending'}
                            </Badge>
                          </div>

                          {milestone.description && (
                            <p className="text-xs text-slate-400 mt-1">
                              {milestone.description}
                            </p>
                          )}

                          {/* Skill Chips */}
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {(milestone.skills || []).map((skill, sIdx) => (
                              <span
                                key={`${skill}-${sIdx}`}
                                className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#181924] text-slate-200 border border-[#2B2C3C]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {milestone.resource?.link && (
                        <a
                          href={milestone.resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#2B2C3C] bg-[#181924] hover:bg-[#202230] hover:text-white text-xs font-semibold text-red-400 transition-colors shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{milestone.resource.title || 'Learning Resource'}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {phases.length === 0 && (
        <Card className="p-8 text-center bg-[#12131A] border border-[#222432] rounded-2xl">
          <Sparkles className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-base font-bold text-white">Synthesizing personalized AI roadmap...</p>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Choose a target career above or click Retry to fetch your AI learning trajectory.
          </p>
        </Card>
      )}
    </div>
  );
};

export default RoadmapPage;
