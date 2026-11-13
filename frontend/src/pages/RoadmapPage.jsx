import React from 'react';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const RoadmapPage = () => {
  const { roadmap, activeCareer, careers, activeCareerId, selectTargetCareer, toggleMilestone, loading } = useRoadmap();

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-semibold">Loading your roadmap...</p>
      </div>
    );
  }

  if (!roadmap || !activeCareer) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">Choose your target career</h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Your learning roadmap is created around a target role. Choose a career path to load its phases, milestones, and learning resources.
          </p>
          <select
            aria-label="Choose target career"
            value={activeCareerId || ''}
            onChange={(event) => event.target.value && selectTargetCareer(event.target.value)}
            className="mt-6 w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800"
          >
            <option value="" disabled>Select a target career</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>{career.title}</option>
            ))}
          </select>
          {!careers.length && (
            <p className="text-xs text-slate-500 mt-3">No career options are available right now. Please try again later.</p>
          )}
        </Card>
      </div>
    );
  }

  const phases = roadmap.phases || [];
  const allMilestones = phases.flatMap((phase) => phase.milestones || []);
  const completedMilestones = allMilestones.filter((milestone) => milestone.status === 'completed').length;
  const completion = allMilestones.length
    ? Math.round((completedMilestones / allMilestones.length) * 100)
    : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-brand-100 text-brand-700">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Personalized Learning Roadmap
            </span>
            <Badge variant="indigo" size="sm">Learning plan</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {roadmap.careerTitle || activeCareer.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete milestones and track your learning progress. Completion reflects checklist activity, not job readiness.
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Roadmap Completion
            </span>
            <span className="text-lg font-black text-brand-600">{completion}%</span>
            <span className="block text-[10px] text-slate-500">
              {completedMilestones} of {allMilestones.length} milestones
            </span>
          </div>
          <div className="w-24">
            <ProgressBar value={completion} size="sm" color="indigo" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          Change target role
          <select
            value={activeCareerId || ''}
            onChange={(event) => event.target.value && selectTargetCareer(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800"
          >
            {careers.map((career) => (
              <option key={career.id} value={career.id}>{career.title}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-8">
        {phases.map((phase, phaseIdx) => (
          <section key={phase.id || phaseIdx} className="relative">
            <div className="flex items-center justify-between mb-4 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  {phase.duration}
                </span>
                <h3 className="text-base font-bold text-slate-900">{phase.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
              </div>
              <Badge variant="indigo" size="sm">Phase {String(phaseIdx + 1).padStart(2, '0')}</Badge>
            </div>

            <div className="space-y-3">
              {(phase.milestones || []).map((milestone) => {
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
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          onClick={() => toggleMilestone(milestone.id, !isCompleted)}
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'border-2 border-slate-300 text-transparent hover:border-brand-500'
                          }`}
                          aria-label={isCompleted ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                          aria-pressed={isCompleted}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className={`text-sm font-bold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                              {milestone.title}
                            </h4>
                            {milestone.isGap && <Badge variant="amber" size="sm">Skill gap</Badge>}
                            <Badge variant={isCompleted ? 'emerald' : 'slate'} size="sm">
                              {isCompleted ? 'Completed' : 'To do'}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {milestone.skills?.map((skill, index) => (
                              <span key={`${skill}-${index}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-brand-600 transition-colors shadow-2xs sm:shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{milestone.resource.title || 'Open resource'}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
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
        <Card className="p-6 text-center">
          <Sparkles className="w-6 h-6 text-brand-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">No roadmap phases are available for this career yet.</p>
          <p className="text-xs text-slate-500 mt-1">Please select another career or try again later.</p>
        </Card>
      )}
    </div>
  );
};

export default RoadmapPage;
