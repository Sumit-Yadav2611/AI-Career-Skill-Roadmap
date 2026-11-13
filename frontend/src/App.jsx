import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoadmapProvider } from './context/RoadmapContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/layout/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const QuizResultPage = lazy(() => import('./pages/QuizResultPage'));
const SkillGapPage = lazy(() => import('./pages/SkillGapPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-9 h-9 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoadmapProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<AppShell />}>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Student Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assessment"
                  element={
                    <ProtectedRoute>
                      <AssessmentPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assessment/result"
                  element={
                    <ProtectedRoute>
                      <QuizResultPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/skill-gap"
                  element={
                    <ProtectedRoute>
                      <SkillGapPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/roadmap"
                  element={
                    <ProtectedRoute>
                      <RoadmapPage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </RoadmapProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
