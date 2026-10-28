import api, { isMockMode } from './api';
import { mockQuizzes } from './mockData';

export const quizService = {
  async getQuizzes() {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 200));
      return mockQuizzes;
    }
    const response = await api.get('/quizzes');
    return response.data;
  },

  async getQuizById(id) {
    if (isMockMode) {
      const quiz = mockQuizzes.find((q) => q.id === id) || mockQuizzes[0];
      return quiz;
    }
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  async submitQuiz(quizId, userAnswers) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 600));
      const quiz = mockQuizzes.find((q) => q.id === quizId) || mockQuizzes[0];
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
          explanation: q.explanation
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
        recommendedCareer = scorePercentage >= 80 ? 'Software Engineer (Systems)' : 'Full-Stack Web Developer';
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
        date: new Date().toISOString()
      };
    }

    const response = await api.post(`/quizzes/${quizId}/submit`, { answers: userAnswers });
    return response.data;
  }
};
