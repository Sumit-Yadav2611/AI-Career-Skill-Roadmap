import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatTime } from '../../utils/helpers';

export const QuizTimer = ({ initialSeconds = 300, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onTimeUp]);

  const isLowTime = secondsLeft < 60;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
        isLowTime
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
          : 'bg-slate-100 border-slate-200 text-slate-800'
      }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-rose-600" />
      ) : (
        <Clock className="w-4 h-4 text-slate-500" />
      )}
      <span>{formatTime(secondsLeft)}</span>
    </div>
  );
};
export default QuizTimer;
