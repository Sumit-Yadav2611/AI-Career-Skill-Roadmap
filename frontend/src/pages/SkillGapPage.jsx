import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const SkillGapPage = () => {
  const { careers, activeCareer, activeCareerId, selectTargetCareer, skillGap, loading, error } = useRoadmap();
  const { user } = useAuth();

  const acquiredSkills = skillGap?.acquired || [];
  const missingSkills = skillGap?.missing || [];
  const totalRequired = skillGap?.totalRequired ?? activeCareer?.requiredSkills?.length ?? 0;
  const matchPercentage = typeof skillGap?.percentage === 'number' ? skillGap.percentage : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="indigo" size="sm" className="mb-1.5">Skill Gap Analysis</Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Skill Gap Analysis</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare skills in your profile with the requirements of your target career.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <label htmlFor="target-career" className="text-xs font-semibold text-slate-500 pl-2">
            Target Role:
          </label>
          <select
            id="target-career"
            value={activeCareerId || ''}
            onChange={(event) => event.target.value && selectTargetCareer(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="" disabled>Select a career</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>{career.title}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          {error}
        </div>
      )}

      {!activeCareer ? (
        <Card className="p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900">Choose a target career to begin</h2>
          <p className="text-sm text-slate-600 mt-2">
            Select a role above. We'll compare its required skills with the skills currently listed in your profile.
          </p>
          {loading && <p className="text-xs text-slate-500 mt-4">Loading career options…</p>}
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 border-l-4 border-l-brand-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Skill Coverage</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {matchPercentage === null ? '—' : `${matchPercentage}%`}
                </span>
                {matchPercentage !== null && (
                  <Badge variant={matchPercentage >= 70 ? 'emerald' : 'amber'} size="sm">
                    {matchPercentage >= 70 ? 'Higher coverage' : 'More skills needed'}
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <ProgressBar value={matchPercentage ?? 0} size="sm" color="indigo" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Based on listed skill names, not a proficiency test.</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-emerald-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Required Skills Found</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600">{acquiredSkills.length}</span>
                <span className="text-xs text-slate-500">of {totalRequired}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Matching names in your profile skill list.</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-rose-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills Not Yet Listed</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-600">{missingSkills.length}</span>
                <span className="text-xs text-rose-600 font-semibold">to review</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Add evidence or learning milestones for these requirements.</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">Skills Listed ({acquiredSkills.length})</h3>
                </div>
                <Badge variant="emerald" size="sm">Found in profile</Badge>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                These required skill names are present in your profile. Their proficiency may still need validation.
              </p>

              {acquiredSkills.length ? (
                <div className="space-y-2.5">
                  {acquiredSkills.map((skill) => (
                    <div key={skill.id || skill.name} className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{skill.name}</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">
                      {skill.category || 'Other'} · {skill.verified ? 'Verified' : skill.source === 'resume' ? 'Resume extracted' : 'Self-reported'}
                    </span>
                      </div>
                      <Badge variant="emerald" size="sm">
                        {skill.userLevel || 'Not assessed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 py-4">
                  {user?.userSkills?.length ? 'None of your listed skills match this role yet.' : 'You have not added skills to your profile yet.'}
                </p>
              )}
            </Card>

            <Card className="p-6 border-rose-100">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900">Skills to Develop ({missingSkills.length})</h3>
                </div>
                <Badge variant="rose" size="sm">Learning opportunities</Badge>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                These target-role requirements are not currently listed in your profile.
              </p>

              {missingSkills.length ? (
                <div className="space-y-2.5">
                  {missingSkills.map((skill) => (
                    <div key={skill.id || skill.name} className="flex items-center justify-between p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{skill.name}</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">Category: {skill.category || 'Other'}</span>
                      </div>
                      <Badge variant={skill.importance === 'Critical' ? 'rose' : 'amber'} size="sm">
                        {skill.importance || 'Required'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-700 py-4">
                  All listed required skill names are present in your profile.
                </p>
              )}
            </Card>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <h3 className="text-lg font-bold">Turn skill gaps into a learning plan</h3>
              <p className="text-xs text-brand-100 mt-1">
                Review learning milestones and resources for {activeCareer.title}.
              </p>
            </div>
            <Link to="/roadmap">
              <Button size="md" className="bg-white text-brand-700 hover:bg-slate-100 font-bold gap-2 shrink-0">
                View Learning Roadmap <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillGapPage;
