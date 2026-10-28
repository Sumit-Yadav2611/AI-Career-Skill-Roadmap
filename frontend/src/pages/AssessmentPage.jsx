import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  AlertCircle
} from 'lucide-react';
import { quizService } from '../services/quizService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import QuizTimer from '../components/quiz/QuizTimer';

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await quizService.getQuizzes();
        setQuizzes(data);
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz) return;
    setSubmitting(true);
    try {
      const result = await quizService.submitQuiz(selectedQuiz.id, userAnswers);
      // Pass result in state to result page
      navigate('/assessment/result', { state: { result } });
    } finally {
      setSubmitting(false);
    }
  };

  // If no quiz selected, show Quiz Hub
  if (!selectedQuiz) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <Badge variant="indigo" size="sm" className="mb-2">
            Skill Evaluation
          </Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill Assessment Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Attempt timed technical assessments to benchmark proficiency and refine your AI career recommendations.
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={quiz.badgeColor || 'indigo'} size="sm">
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {Math.round(quiz.timeLimit / 60)} Mins
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {quiz.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <HelpCircle className="w-4 h-4 text-brand-600" />
                    {quiz.totalQuestions} Questions
                  </span>
                  <span>•</span>
                  <span>{quiz.category}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  size="md"
                  className="w-full gap-2 shadow-xs"
                  onClick={() => handleStartQuiz(quiz)}
                >
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Quiz In Progress View
  const question = selectedQuiz.questions[currentQuestionIndex];
  const totalQuestions = selectedQuiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            {selectedQuiz.category}
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            {selectedQuiz.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <QuizTimer
            initialSeconds={selectedQuiz.timeLimit}
            onTimeUp={handleSubmitQuiz}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedQuiz(null)}
          >
            Exit
          </Button>
        </div>
      </div>

      {/* Progress & Palette */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} of {totalQuestions} Answered</span>
        </div>
        <ProgressBar value={progressPercent} size="sm" color="indigo" />

        {/* Question Palette Bubbles */}
        <div className="flex items-center gap-2 pt-2">
          {selectedQuiz.questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'ring-2 ring-brand-500 bg-brand-600 text-white'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = userAnswers[question.id] === idx;

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(question.id, idx)}
                className={`flex items-center gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                    isSelected
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm font-medium text-slate-800">
                  {option}
                </span>
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
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button
            size="md"
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
            className="gap-2"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            size="md"
            variant="accent"
            onClick={handleSubmitQuiz}
            isLoading={submitting}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md"
          >
            Submit Quiz <CheckCircle2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default AssessmentPage;
