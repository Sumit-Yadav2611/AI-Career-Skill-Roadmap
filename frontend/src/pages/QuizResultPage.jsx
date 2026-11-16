import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MapPin,
  LayoutDashboard,
  BrainCircuit,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const QuizResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/assessment" replace />;
  }

  const {
    quizTitle = 'Assessment',
    scorePercentage = 85,
    correctCount = 4,
    totalQuestions = 5,
    breakdown = [],
    recommendedCareer = 'Full-Stack Web Developer',
    confidence = 90,
  } = result;

  const isPassed = scorePercentage >= 70;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-7">
      {/* Result Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#161724] via-[#12131A] to-[#250F16] border border-[#26283A] p-6 sm:p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-950/80 border border-red-800/60 text-red-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(239,68,68,0.35)]">
          <Trophy className="w-8 h-8" />
        </div>

        <Badge
          variant={isPassed ? 'emerald' : 'rose'}
          size="sm"
          className="mb-2"
        >
          {isPassed ? 'Benchmark Achieved' : 'Review Recommended'}
        </Badge>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {quizTitle} Scorecard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          You scored <strong className="text-white">{correctCount}</strong> out of{' '}
          <strong className="text-white">{totalQuestions}</strong> questions correctly.
        </p>

        {/* Score Ring / Pill */}
        <div className="mt-5 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#161722] border border-[#2D2E42] shadow-inner">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Overall Score:
          </span>
          <span className="text-2xl font-black text-red-500">{scorePercentage}%</span>
        </div>
      </div>

      {/* AI Career Recommendation Prediction */}
      <Card className="p-6 bg-[#12131A] border border-red-950/80 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1E202B]">
          <Sparkles className="w-5 h-5 text-red-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            AI Microservice Career Trajectory Insight
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400">Predicted Career Alignment:</span>
            <p className="text-lg font-black text-white mt-0.5">{recommendedCareer}</p>
            <p className="text-xs text-slate-400 mt-1">
              AI Confidence Index: <strong className="text-emerald-400">{confidence}%</strong> based on performance and skill telemetry.
            </p>
          </div>

          <Link to="/roadmap">
            <Button
              size="md"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white font-bold rounded-full px-5 py-2.5 shadow-lg shadow-red-600/30 gap-2 shrink-0"
            >
              <MapPin className="w-4 h-4" /> View AI Roadmap
            </Button>
          </Link>
        </div>
      </Card>

      {/* Questions Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-red-500" />
          Questions & Technical Explanations
        </h3>

        <div className="space-y-3">
          {breakdown.map((item, idx) => (
            <Card
              key={idx}
              className={`p-5 bg-[#12131A] border rounded-2xl ${
                item.isCorrect
                  ? 'border-emerald-800/40 bg-[#0E1A14]'
                  : 'border-red-900/50 bg-[#1A0D12]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {idx + 1}. {item.question}
                    </h4>

                    <div className="mt-2 text-xs space-y-1">
                      <p className="text-slate-300">
                        <span className="text-slate-500">Your Answer: </span>
                        <strong className={item.isCorrect ? 'text-emerald-300' : 'text-red-300'}>
                          {item.options[item.selectedIndex] || 'Not answered'}
                        </strong>
                      </p>
                      {!item.isCorrect && (
                        <p className="text-emerald-300">
                          <span className="text-slate-500">Correct Answer: </span>
                          <strong>{item.options[item.correctIndex]}</strong>
                        </p>
                      )}
                    </div>

                    {item.explanation && (
                      <p className="text-[11px] text-slate-400 mt-2.5 p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <strong className="text-slate-300">Explanation: </strong>
                        {item.explanation}
                      </p>
                    )}
                  </div>
                </div>

                <Badge
                  variant={item.isCorrect ? 'emerald' : 'rose'}
                  size="sm"
                >
                  {item.isCorrect ? '+100 XP' : '0 XP'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1E202B]">
        <Link to="/assessment">
          <Button
            size="md"
            variant="secondary"
            className="bg-[#181924] text-slate-300 border border-[#2B2C3C] hover:bg-[#202230] rounded-full gap-2 px-5"
          >
            <RotateCcw className="w-4 h-4" /> Retake Another Quiz
          </Button>
        </Link>

        <Link to="/dashboard">
          <Button
            size="md"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white font-bold rounded-full gap-2 px-6 shadow-md shadow-red-600/30"
          >
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResultPage;
