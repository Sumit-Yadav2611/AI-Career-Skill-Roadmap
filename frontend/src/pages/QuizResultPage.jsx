import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  LayoutDashboard,
  GitFork,
  HelpCircle
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const QuizResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback demo result if navigated directly
  const result = location.state?.result || {
    quizTitle: 'Full-Stack Web Development',
    totalQuestions: 5,
    correctCount: 4,
    scorePercentage: 80,
    recommendedCareer: 'Full-Stack Web Developer',
    confidence: 88,
    breakdown: [
      {
        question: 'Which React hook should be used to perform side effects such as fetching data from an API?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        selectedIndex: 1,
        correctIndex: 1,
        isCorrect: true,
        explanation: 'useEffect handles side-effects like data fetching, manual DOM manipulation, and subscriptions in functional components.'
      },
      {
        question: 'What is the primary role of middleware in Express.js?',
        options: ['Direct database indexing', 'To execute code and modify req/res objects', 'To compile JSX', 'Manage browser cookies exclusively'],
        selectedIndex: 1,
        correctIndex: 1,
        isCorrect: true,
        explanation: 'Middleware functions have access to the request and response objects in Express.'
      },
      {
        question: 'Which HTTP method should be used for idempotent updates where the entire resource is replaced?',
        options: ['POST', 'PATCH', 'PUT', 'DELETE'],
        selectedIndex: 2,
        correctIndex: 2,
        isCorrect: true,
        explanation: 'PUT is idempotent and replaces the target resource entirely.'
      },
      {
        question: 'In MongoDB, what does indexing on a collection field primarily improve?',
        options: ['Query execution speed', 'Storage compression', 'Write speed on bulk inserts', 'Encryption speed'],
        selectedIndex: 0,
        correctIndex: 0,
        isCorrect: true,
        explanation: 'Indexes optimize search queries by avoiding full collection scans.'
      },
      {
        question: 'What is the virtual DOM in React?',
        options: ['A direct replica in C++', 'An in-memory representation that optimizes UI re-rendering', 'An external cloud DB', 'A Chrome engine feature'],
        selectedIndex: 0,
        correctIndex: 1,
        isCorrect: false,
        explanation: 'The Virtual DOM keeps a representation of UI components in memory and syncs with the real DOM efficiently through reconciliation diffing.'
      }
    ]
  };

  useEffect(() => {
    if (result.scorePercentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.scorePercentage]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Score Summary Banner */}
      <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-white via-indigo-50/30 to-brand-50/40 border-brand-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-600 text-white shadow-lg shadow-brand-500/25 mb-4">
          <Award className="w-8 h-8" />
        </div>

        <Badge variant={result.scorePercentage >= 75 ? 'emerald' : 'amber'} size="md" className="mb-2">
          Assessment Completed
        </Badge>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {result.quizTitle} Results
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          <div>
            <span className="text-3xl font-black text-slate-900">{result.scorePercentage}%</span>
            <span className="block text-xs text-slate-500 font-medium">Final Score</span>
          </div>
          <div className="w-px h-10 bg-slate-200 hidden sm:block" />
          <div>
            <span className="text-3xl font-black text-emerald-600">
              {result.correctCount} / {result.totalQuestions}
            </span>
            <span className="block text-xs text-slate-500 font-medium">Correct Answers</span>
          </div>
          <div className="w-px h-10 bg-slate-200 hidden sm:block" />
          <div>
            <span className="text-3xl font-black text-brand-600">{result.confidence}%</span>
            <span className="block text-xs text-slate-500 font-medium">AI Career Fit</span>
          </div>
        </div>

        {/* AI Career Recommendation Callout */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-brand-200 shadow-xs max-w-lg mx-auto flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recommended Career Role
              </p>
              <p className="text-sm font-extrabold text-slate-900">
                {result.recommendedCareer}
              </p>
            </div>
          </div>
          <Link to="/skill-gap">
            <Button size="sm" className="gap-1.5">
              Check Skill Gap <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Question by Question Review */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          Detailed Question Breakdown ({result.breakdown?.length || 0})
        </h3>

        {result.breakdown?.map((item, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.question}</h4>
                  <div className="mt-3 space-y-1.5 text-xs">
                    <p className="text-slate-600">
                      Your Answer:{' '}
                      <span className={item.isCorrect ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}>
                        {item.options[item.selectedIndex] || 'Skipped'}
                      </span>
                    </p>
                    {!item.isCorrect && (
                      <p className="text-slate-600">
                        Correct Answer:{' '}
                        <span className="font-bold text-emerald-600">
                          {item.options[item.correctIndex]}
                        </span>
                      </p>
                    )}
                  </div>

                  {item.explanation && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <span className="font-bold text-slate-800">Explanation: </span>
                      {item.explanation}
                    </div>
                  )}
                </div>
              </div>

              <div>
                {item.isCorrect ? (
                  <Badge variant="emerald" size="sm" icon={CheckCircle2}>
                    Correct
                  </Badge>
                ) : (
                  <Badge variant="rose" size="sm" icon={XCircle}>
                    Incorrect
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link to="/assessment">
          <Button variant="secondary" size="md" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Retake or Try Another Quiz
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/skill-gap">
            <Button size="md" className="gap-2">
              <GitFork className="w-4 h-4" /> View Skill Gap Matrix
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="md" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default QuizResultPage;
