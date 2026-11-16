import { mockQuizzes } from './mockData';

export const quizService = {
  /**
   * Assessment APIs are ignored as requested.
   * Assessment page directly loads mockQuizzes and conducts client evaluation.
   */
  async getQuizzes() {
    await new Promise((res) => setTimeout(res, 100));
    return mockQuizzes;
  },

  async getQuizById(id) {
    const quiz = mockQuizzes.find((item) => item.id === id);
    if (!quiz) throw new Error(`Assessment "${id}" was not found.`);
    return quiz;
  },

  async submitQuiz(quizId, userAnswers) {
    await new Promise((res) => setTimeout(res, 300));
    const quiz = mockQuizzes.find((item) => item.id === quizId) || mockQuizzes[0];

    let correctCount = 0;
    const breakdown = quiz.questions.map((q) => {
      const selectedIndex = userAnswers[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation || 'Reviewed against technical knowledge benchmarks.',
      };
    });

    const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);

    // AI-based career prediction feedback
    let recommendedCareer = 'Full-Stack Web Developer';
    let confidence = 88;
    if (quizId === 'quiz-aiml') {
      recommendedCareer = 'AI / Machine Learning Engineer';
      confidence = Math.min(scorePercentage + 15, 96);
    } else if (quizId === 'quiz-dsa') {
      recommendedCareer =
        scorePercentage >= 80
          ? 'Software Engineer (Systems)'
          : 'Full-Stack Web Developer';
      confidence = Math.min(scorePercentage + 10, 92);
    }

    return {
      quizId,
      quizTitle: quiz.title,
      totalQuestions: quiz.questions.length,
      correctCount,
      scorePercentage,
      breakdown,
      recommendedCareer,
      confidence,
      date: new Date().toISOString(),
    };
  },
};

export default quizService;
