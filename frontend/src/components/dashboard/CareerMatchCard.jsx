import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const CareerMatchCard = ({
  career,
  alternateCareers = [],
  onSelectCareer,
  isDemo = false
}) => {
  if (!career) return null;

  const hasMatchScore = Number.isFinite(Number(career.matchScore));

  return (
    <Card className="p-6 overflow-hidden relative border-brand-200/80 bg-gradient-to-br from-white via-indigo-50/20 to-brand-50/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-brand-100 text-brand-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Selected Target Career
            </span>
            {isDemo ? (
              <Badge variant="amber" size="sm">Sample profile</Badge>
            ) : hasMatchScore ? (
              <Badge variant="emerald" size="sm">{career.matchScore}% Match</Badge>
            ) : (
              <Badge variant="indigo" size="sm">Target role</Badge>
            )}
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {career.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            {career.description}
          </p>
          {isDemo && (
            <p className="text-[11px] text-amber-700 mt-2">
              Career details and match values shown here are illustrative demo data.
            </p>
          )}
        </div>

        <Link to="/roadmap">
          <Button size="md" className="gap-2 shadow-sm">
            Open Full Roadmap <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {!isDemo && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-b border-slate-100 text-xs">
          {career.avgSalary && (
            <div>
              <span className="text-slate-400 block font-medium">Compensation reference</span>
              <span className="text-slate-800 font-bold mt-0.5 block">{career.avgSalary}</span>
            </div>
          )}
          {career.demand && (
            <div>
              <span className="text-slate-400 block font-medium">Industry demand</span>
              <span className="text-slate-800 font-bold mt-0.5 block">{career.demand}</span>
            </div>
          )}
          {career.growthOutlook && (
            <div>
              <span className="text-slate-400 block font-medium">Market outlook</span>
              <span className="text-slate-800 font-bold mt-0.5 block">{career.growthOutlook}</span>
            </div>
          )}
        </div>
      )}

      {alternateCareers.length > 0 && (
        <div className="pt-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Other available career paths
          </span>
          <div className="flex flex-wrap gap-2">
            {alternateCareers.map((alternate) => (
              <button
                key={alternate.id}
                type="button"
                onClick={() => onSelectCareer?.(alternate.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-brand-300 text-xs text-slate-700 transition-colors"
              >
                <span className="font-semibold">{alternate.title}</span>
                {!isDemo && Number.isFinite(Number(alternate.matchScore)) && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    {alternate.matchScore}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CareerMatchCard;
