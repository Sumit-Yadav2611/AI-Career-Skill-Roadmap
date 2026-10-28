import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const CareerMatchCard = ({ career, alternateCareers = [], onSelectCareer }) => {
  if (!career) return null;

  return (
    <Card className="p-6 overflow-hidden relative border-brand-200/80 bg-gradient-to-br from-white via-indigo-50/20 to-brand-50/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-brand-100 text-brand-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Top ML-Predicted Career
            </span>
            <Badge variant="emerald" size="sm">
              {career.matchScore}% Match Confidence
            </Badge>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {career.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            {career.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/roadmap">
            <Button size="md" className="gap-2 shadow-sm">
              Open Full Roadmap <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Meta Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-b border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block font-medium">Average Compensation</span>
          <span className="text-slate-800 font-bold mt-0.5 block">{career.avgSalary}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Industry Demand</span>
          <span className="text-emerald-700 font-bold mt-0.5 block">{career.demand} Demand</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Market Outlook</span>
          <span className="text-brand-700 font-bold mt-0.5 block">{career.growthOutlook}</span>
        </div>
      </div>

      {/* Alternate Predictions */}
      {alternateCareers.length > 0 && (
        <div className="pt-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Alternative Career Recommendations
          </span>
          <div className="flex flex-wrap gap-2">
            {alternateCareers.map((alt) => (
              <button
                key={alt.id}
                onClick={() => onSelectCareer && onSelectCareer(alt.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-brand-300 text-xs text-slate-700 transition-colors"
              >
                <span className="font-semibold">{alt.title}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  {alt.matchScore}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
export default CareerMatchCard;
