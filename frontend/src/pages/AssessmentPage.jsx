import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  BrainCircuit,
  Sparkles,
  Award,
} from 'lucide-react';
import { quizService } from '../services/quizService';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import QuizTimer from '../components/quiz/QuizTimer';

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const submissionStarted = useRef(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setError('');
        // Assessment APIs ignored as requested - purely loads frontend quizzes
        const data = await quizService.getQuizzes();
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Unable to load assessments.');
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  const handleStartQuiz = (quiz) => {
    setError('');
    submissionStarted.current = false;
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz || submissionStarted.current) return;
    submissionStarted.current = true;
    setError('');
    setSubmitting(true);
    try {
      // Direct client evaluation without backend dependency
      const result = await quizService.submitQuiz(selectedQuiz.id, userAnswers);

      const previousAttempts = user?.assessmentHistory || [];
      const attempt = {
        id: `attempt_${Date.now()}`,
        quizTitle: result.quizTitle,
        score: result.scorePercentage,
        totalQuestions: result.totalQuestions,
        date: result.date || new Date().toISOString(),
      };

      try {
        await updateUserProfile({
          assessmentHistory: [...previousAttempts, attempt],
        });
      } catch {}

      // Navigate to Quiz Result page on submission
      navigate('/assessment/result', { state: { result } });
    } catch (err) {
      submissionStarted.current = false;
      setError('Unable to process assessment submission.');
    } finally {
      setSubmitting(false);
    }
  };

  // If no quiz selected, show Quiz Hub
  if (!selectedQuiz) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              Technical Skill Evaluations
            </span>
            <Badge variant="rose" size="sm">Timed Quizzes</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Skill Assessment Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Attempt timed technical assessments to benchmark your competency levels. Submission immediately generates your AI career scorecard.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-950 border-t-red-500 rounded-full animate-spin mb-3" />
            Loading assessments...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="p-6 bg-[#12131A] border border-[#222432] hover:border-red-600/50 transition-all rounded-2xl flex flex-col justify-between shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 px-2.5 py-1 rounded-full bg-red-950/70 border border-red-800/40">
                      {quiz.category || 'General'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {Math.round(quiz.timeLimit / 60)} mins
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E202B] flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {quiz.questions?.length || 5} Questions
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleStartQuiz(quiz)}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full px-5 py-2 text-xs shadow-md shadow-red-600/30 gap-1.5"
                  >
                    Start Quiz <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Active Quiz View
  const questions = selectedQuiz.questions || [];
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1E202B] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
            {selectedQuiz.category}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">
            {selectedQuiz.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <QuizTimer
            initialSeconds={selectedQuiz.timeLimit || 600}
            onTimeUp={handleSubmitQuiz}
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSelectedQuiz(null)}
            className="bg-[#181924] text-slate-300 border border-[#2B2C3C] hover:bg-[#202230] rounded-full text-xs px-3.5"
          >
            Exit Quiz
          </Button>
        </div>
      </div>

      {/* Progress & Palette */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} of {totalQuestions} Answered</span>
        </div>
        <ProgressBar value={progressPercent} size="sm" color="rose" />

        {/* Question Palette Bubbles */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isCurrent
                    ? 'ring-2 ring-red-500 bg-red-600 text-white shadow-lg shadow-red-600/40'
                    : isAnswered
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                    : 'bg-[#181924] text-slate-400 border border-[#2B2C3C] hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8 bg-[#12131A] border border-[#222432] rounded-2xl">
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
          {question?.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {(question?.options || []).map((option, idx) => {
            const isSelected = userAnswers[question.id] === idx;

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(question.id, idx)}
                className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-red-600 bg-red-950/40 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'border-[#242636] bg-[#161722] text-slate-300 hover:border-slate-500 hover:bg-[#181926]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${
                    isSelected
                      ? 'border-red-500 bg-red-600 text-white'
                      : 'border-[#2D2E40] text-slate-400 bg-[#12131A]'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          size="md"
          variant="secondary"
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentQuestionIndex === 0}
          className="bg-[#181924] text-slate-300 border border-[#2B2C3C] hover:bg-[#202230] rounded-full gap-2 px-5"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button
            size="md"
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white font-bold rounded-full gap-2 px-5 shadow-lg shadow-red-600/30"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            size="md"
            onClick={handleSubmitQuiz}
            isLoading={submitting}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold rounded-full gap-2 px-6 shadow-lg shadow-emerald-600/30"
          >
            Submit Quiz <CheckCircle2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
