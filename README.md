# AI-Based Career & Skill Roadmap Platform (CSRP)

> **Software Engineering Project (SPMP Lab 3)**  
> Built with modern React.js, Tailwind CSS, Lucide Icons, Recharts, and Axios. Designed to connect with Spring Boot / Node.js backend and Python ML microservices.

---

## 🌟 Overview

The **AI-Based Career & Skill Roadmap Platform** is an intelligent web application engineered to guide engineering graduates and students in identifying, evaluating, and achieving their ideal tech careers.

The platform provides an end-to-end workflow:
1. **Resume Ingestion & Parsing**: Extracts technical skills, education, and projects from uploaded PDFs using simulated NLP extraction (`pdfplumber` + `spaCy`).
2. **Interactive Assessments**: Timed, multiple-choice domain quizzes (Web Development, DSA, AI/ML) that evaluate actual competency.
3. **ML Career Prediction**: Supervised recommendation engine matching student profiles and test scores to industry roles.
4. **Automated Skill Gap Analysis**: Side-by-side matrix comparing acquired skills vs required skills for the target career.
5. **Dynamic Step-by-Step Roadmap**: Multi-phase learning milestones with interactive completion checkboxes, career readiness gauges, and curated learning resources.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation & Running Locally

1. **Clone or navigate to the workspace root:**
   ```bash
   cd SE_Project
   ```

2. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   *(Or navigate directly to `frontend/` and run `npm run dev`)*

3. **Open the Application in your browser:**
   ```
   http://localhost:5173
   ```

4. **1-Click Demo Login:**
   On the `/login` page, click the **"1-Click Login"** button to immediately explore the pre-populated student profile (Aarav Sharma), skill radar charts, and active roadmaps.

---

## 🗺️ 9-Step Roadmap Implementation Summary

| Step | Module | Deliverables Completed |
|---|---|---|
| **Step 1** | **Project Setup** | Vite + React, Tailwind CSS design tokens, Lucide Icons, Recharts, folder architecture, and Git initialization. |
| **Step 2** | **Shared Layout** | Responsive AppShell, collapsible Sidebar with mobile drawer, sticky Navbar with career selector & notification center, reusable UI kit (`Button`, `Card`, `Badge`, `Modal`, `ProgressBar`, `FormInput`). |
| **Step 3** | **Landing Page** | High-impact hero section, 4-core capability cards, 4-step interactive workflow, platform metrics, and student registration CTA. |
| **Step 4** | **Login & Registration** | Split-screen layout, academic registration form (Degree, Semester, CGPA, Target role), client validation, JWT localStorage persistence, and 1-click demo login. |
| **Step 5** | **Dashboard** | 4 KPI summary cards (Readiness Index %, Profile Score, Quiz Average, Skill Gap count), Recharts Radar chart (domain competency) and Bar chart (milestone streak), ML prediction card. |
| **Step 6** | **Profile & Resume** | Academic details editor, interactive skills inventory with proficiency tags, drag-and-drop PDF resume upload with simulated NLP extraction and 1-click sync to profile. |
| **Step 7** | **Assessment & Results** | Quiz Hub with 3 domains (Web Dev, DSA, AI/ML), real-time countdown timer, question palette navigation, score calculation, confetti celebration, and ML career recommendation trigger. |
| **Step 8** | **Skill Gap & Roadmap** | Side-by-side gap matrix (Acquired vs Missing skills), 4-phase learning milestones (Foundations, Frontend, Backend, Cloud/DevOps), interactive checkboxes updating readiness in real time. |
| **Step 9** | **API Integration & Testing** | Centralized Axios client with JWT interceptor, `.env` toggle for mock vs live backend mode, protected routes (`<ProtectedRoute>`), clean production build (`npm run build`). |

---

## 🔌 Dual-Mode API Integration (Step 9)

The platform features an intelligent dual-mode architecture configured in `frontend/.env`:

```env
# Change to false to connect to a live backend
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080/api
```

- **Mock Mode (`true`)**: Runs completely self-contained with realistic delays, localStorage persistence, and interactive quiz/milestone updates.
- **Backend Mode (`false`)**: Automatically makes REST calls to your Spring Boot / Express server with `Authorization: Bearer <jwt_token>` attached to every request.

---

## 📁 Folder Structure

```
SE_Project/
├── package.json               # Root scripts (npm run dev, npm run build)
├── .gitignore                 # Root git ignores
├── SPMP.docx                  # Lab 3 SPMP Document
├── 05_08_2026_SPMP_Documnet_Lab3.docx
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env
    └── src/
        ├── components/
        │   ├── common/        # Button, Card, Badge, Modal, FormInput, ProgressBar
        │   ├── layout/        # Navbar, Sidebar, AppShell, Footer, ProtectedRoute
        │   ├── dashboard/     # SkillRadarChart, MilestoneBarChart, CareerMatchCard
        │   ├── resume/        # ResumeUploader, ParsedPreviewModal
        │   └── quiz/          # QuizTimer
        ├── context/
        │   ├── AuthContext.jsx
        │   └── RoadmapContext.jsx
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── ProfilePage.jsx
        │   ├── AssessmentPage.jsx
        │   ├── QuizResultPage.jsx
        │   ├── SkillGapPage.jsx
        │   ├── RoadmapPage.jsx
        │   └── NotFoundPage.jsx
        ├── services/
        │   ├── api.js         # Axios instance + interceptors
        │   ├── authService.js
        │   ├── careerService.js
        │   ├── quizService.js
        │   └── mockData.js
        ├── utils/
        │   └── helpers.js
        ├── App.jsx
        └── main.jsx
```
