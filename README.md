# AI Career & Skill Roadmap Platform

A React-based career planning platform for students and early-career developers. The frontend helps users maintain a profile, review their skills, take technical assessments, compare their profile with a target role, and work through a learning roadmap.

> **Repository status:** The `main` branch currently contains the React frontend and project documentation. The Spring Boot and Python service code discussed during development is not present in this branch yet. Live API mode therefore requires the backend team to publish and run the matching services.

## Current frontend modules

- **Landing page:** Product overview, platform capabilities, and registration entry point.
- **Authentication:** Login and registration screens with protected student routes.
- **Student profile:** Academic details and an editable skill inventory.
- **Resume workspace:** PDF upload UI and a parsed-data review flow.
- **Assessments:** Timed multiple-choice assessments, scoring, and answer review.
- **Career selection:** Choose a target career from the career service.
- **Skill gap analysis:** Compare skill names in the student profile with a role's required skills.
- **Learning roadmap:** View phases, milestones, learning resources, and completion status.
- **Dashboard:** Profile completeness, assessment average, roadmap completion, skill coverage, and phase progress.

## Technology

- React and Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React
- Canvas Confetti

## Run the frontend locally

Prerequisites: Node.js 18 or newer and npm.

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

To verify the production bundle:

```powershell
npm run build
npm run preview
```

## Development demo mode

The example environment file enables local mock mode:

```env
VITE_API_BASE_URL=http://localhost:10000/api
VITE_USE_MOCK=true
```

Mock mode is enabled only when running the Vite development server. Production builds always use the API, even when `VITE_USE_MOCK=true` is accidentally configured.

The login screen exposes a clearly labeled demo-account option in development. Demo career data, questions, assessment suggestions, and resume previews are illustrative sample data. A resume upload in mock mode does **not** parse or upload the selected PDF. Do not treat demo data as a real assessment, resume analysis, or AI-generated recommendation.

Newly registered demo users start with an empty skill list and roadmap checklist. Mock roadmap progress is scoped to the current local account and target career.

## Live API configuration

When the backend is available, set the frontend environment:

```env
VITE_API_BASE_URL=http://localhost:10000/api
VITE_USE_MOCK=false
```

Restart Vite after editing the environment file.

The current frontend service layer expects these routes:

| Method | Route | Frontend purpose |
|---|---|---|
| POST | `/auth/register` | Create a student account |
| POST | `/auth/login` | Sign in |
| PUT | `/profile` | Update the signed-in student's profile |
| GET | `/careers` | List career options |
| GET | `/careers/{careerId}` | Load a career and required skills |
| GET | `/roadmap/{careerId}` | Load a student's roadmap for a career |
| PATCH | `/roadmap/{careerId}/milestones/{milestoneId}` | Update milestone completion |
| POST | `/resume/parse` | Upload and analyze a PDF resume |
| GET | `/quizzes` | List assessments |
| GET | `/quizzes/{quizId}` | Load an assessment |
| POST | `/quizzes/{quizId}/submit` | Submit answers and return a result |

These are the frontend's current expectations, not a claim that the backend routes are already deployed. The backend team should confirm request/response shapes, authentication behavior, CORS settings, and error formats before switching users to live mode.

## Important implementation notes

- Skill names extracted from a resume are marked **Not assessed** until the student provides a proficiency level.
- Dashboard roadmap completion is calculated from completed milestones. It is not presented as a career-readiness or job-placement probability.
- Skill coverage currently compares normalized skill names. It does not independently verify proficiency or prove that a student can demonstrate a skill.
- Assessment results are passed to the result page during navigation. Persistent result-history retrieval after a page refresh still requires a backend attempt-history API.
- The current Axios client attaches a bearer token from local storage. Before a public launch, review the authentication design with the backend team; secure, HttpOnly cookie-based sessions may be preferable depending on the API and CSRF strategy.
- Do not commit real `.env` files, API keys, passwords, student resumes, or private user data.

## Collaboration

Work on a feature branch, keep changes scoped to the frontend you own, and open a pull request for review before merging into `main`. Coordinate API contract changes with the backend team rather than guessing endpoint behavior.
