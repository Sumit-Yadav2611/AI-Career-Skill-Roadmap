import React from 'react';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Video,
  Clock,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const RoadmapPage = () => {
  const { roadmap, activeCareer, careers, selectTargetCareer, toggleMilestone, loading } = useRoadmap();

  if (loading || !roadmap) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-semibold">Generating customized roadmap...</p>
      </div>
    );
  }

  const phases = roadmap.phases || [];
  const readiness = roadmap.readinessScore || 72;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-brand-100 text-brand-700">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Personalized Learning Roadmap
            </span>
            <Badge variant="indigo" size="sm">
              SPMP Multi-Phase Plan
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {roadmap.careerTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Check off milestones as you learn. Your career readiness index updates in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Readiness
              </span>
              <span className="text-lg font-black text-brand-600">
                {readiness}%
              </span>
            </div>
            <div className="w-24">
              <ProgressBar value={readiness} size="sm" color="indigo" />
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Phase Milestones */}
      <div className="space-y-8">
        {phases.map((phase, phaseIdx) => (
          <div key={phase.id} className="relative">
            {/* Phase Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  {phase.duration}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {phase.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {phase.description}
                </p>
              </div>
              <Badge variant="indigo" size="sm">
                Phase 0{phaseIdx + 1}
              </Badge>
            </div>

            {/* Milestones List */}
            <div className="space-y-3">
              {phase.milestones.map((milestone) => {
                const isCompleted = milestone.status === 'completed';

                return (
                  <Card
                    key={milestone.id}
                    className={`p-4 sm:p-5 transition-all ${
                      isCompleted
                        ? 'border-emerald-200/80 bg-emerald-50/20'
                        : milestone.isGap
                        ? 'border-amber-200/80 bg-amber-50/20'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Checkbox & Details */}
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          onClick={() => toggleMilestone(milestone.id, !isCompleted)}
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'border-2 border-slate-300 text-transparent hover:border-brand-500'
                          }`}
                          aria-label="Toggle milestone completion"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className={`text-sm font-bold ${
                                isCompleted
                                  ? 'text-slate-500 line-through'
                                  : 'text-slate-900'
                              }`}
                            >
                              {milestone.title}
                            </h4>

                            {milestone.isGap && (
                              <Badge variant="amber" size="sm">
                                Closes Gap
                              </Badge>
                            )}

                            {isCompleted ? (
                              <Badge variant="emerald" size="sm">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="slate" size="sm">
                                To Do
                              </Badge>
                            )}
                          </div>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {milestone.skills?.map((sk, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Resource Link */}
                      {milestone.resource && (
                        <div className="shrink-0">
                          <a
                            href={milestone.resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-brand-600 transition-colors shadow-2xs"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {milestone.resource.title}
                            </span>
                            <span className="sm:hidden">Resource</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RoadmapPage;
