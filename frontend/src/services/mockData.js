/**
 * Mock Data for AI-Based Career & Skill Roadmap Platform (CSRP)
 * Designed according to SPMP Document Lab 3 specifications.
 */

export const mockCareers = [
  {
    id: 'full-stack',
    title: 'Full-Stack Web Developer',
    description: 'Design and build end-to-end scalable web applications using modern client and server frameworks.',
    matchScore: 88,
    demand: 'High',
    avgSalary: '₹8 - 18 LPA',
    color: 'indigo',
    requiredSkills: [
      { id: 's1', name: 'React.js', category: 'Frontend', level: 'Intermediate', importance: 'Critical' },
      { id: 's2', name: 'Node.js', category: 'Backend', level: 'Intermediate', importance: 'Critical' },
      { id: 's3', name: 'JavaScript', category: 'Language', level: 'Advanced', importance: 'Critical' },
      { id: 's4', name: 'REST APIs', category: 'Backend', level: 'Intermediate', importance: 'High' },
      { id: 's5', name: 'MongoDB', category: 'Database', level: 'Intermediate', importance: 'High' },
      { id: 's6', name: 'Git & GitHub', category: 'Tools', level: 'Intermediate', importance: 'Medium' },
      { id: 's7', name: 'Tailwind CSS', category: 'Frontend', level: 'Intermediate', importance: 'Medium' },
      { id: 's8', name: 'Docker', category: 'DevOps', level: 'Beginner', importance: 'High' },
      { id: 's9', name: 'CI/CD Pipelines', category: 'DevOps', level: 'Beginner', importance: 'Medium' },
      { id: 's10', name: 'PostgreSQL', category: 'Database', level: 'Intermediate', importance: 'Medium' }
    ],
    growthOutlook: '+24% YoY Growth in Tech Industry'
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning Engineer',
    description: 'Develop intelligent models, neural networks, and automated prediction pipelines using modern ML frameworks.',
    matchScore: 78,
    demand: 'Very High',
    avgSalary: '₹10 - 24 LPA',
    color: 'purple',
    requiredSkills: [
      { id: 'ml1', name: 'Python', category: 'Language', level: 'Advanced', importance: 'Critical' },
      { id: 'ml2', name: 'NumPy & Pandas', category: 'Data Analysis', level: 'Advanced', importance: 'Critical' },
      { id: 'ml3', name: 'Scikit-learn', category: 'Machine Learning', level: 'Intermediate', importance: 'Critical' },
      { id: 'ml4', name: 'PyTorch / TensorFlow', category: 'Deep Learning', level: 'Intermediate', importance: 'High' },
      { id: 'ml5', name: 'NLP & spaCy', category: 'NLP', level: 'Intermediate', importance: 'High' },
      { id: 'ml6', name: 'SQL', category: 'Database', level: 'Intermediate', importance: 'Medium' },
      { id: 'ml7', name: 'Model Deployment (FastAPI)', category: 'Backend', level: 'Beginner', importance: 'Medium' },
      { id: 'ml8', name: 'Statistics & Math', category: 'Theory', level: 'Advanced', importance: 'Critical' }
    ],
    growthOutlook: '+38% YoY Surge fueled by Generative AI'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Derive predictive insights from raw big data using statistical modeling and actionable visualizations.',
    matchScore: 74,
    demand: 'High',
    avgSalary: '₹9 - 20 LPA',
    color: 'cyan',
    requiredSkills: [
      { id: 'ds1', name: 'Python', category: 'Language', level: 'Advanced', importance: 'Critical' },
      { id: 'ds2', name: 'SQL', category: 'Database', level: 'Advanced', importance: 'Critical' },
      { id: 'ds3', name: 'Applied Statistics', category: 'Theory', level: 'Advanced', importance: 'Critical' },
      { id: 'ds4', name: 'Pandas & EDA', category: 'Data Analysis', level: 'Advanced', importance: 'High' },
      { id: 'ds5', name: 'Data Visualization (PowerBI)', category: 'BI Tools', level: 'Intermediate', importance: 'High' },
      { id: 'ds6', name: 'Machine Learning Models', category: 'ML', level: 'Intermediate', importance: 'High' },
      { id: 'ds7', name: 'A/B Testing', category: 'Methodology', level: 'Intermediate', importance: 'Medium' }
    ],
    growthOutlook: '+28% Expansion across Analytics & Enterprise'
  },
  {
    id: 'devops-cloud',
    title: 'Cloud & DevOps Architect',
    description: 'Orchestrate resilient cloud infrastructure, automated delivery pipelines, and containerized microservices.',
    matchScore: 65,
    demand: 'Very High',
    avgSalary: '₹11 - 25 LPA',
    color: 'emerald',
    requiredSkills: [
      { id: 'do1', name: 'Linux Administration', category: 'OS', level: 'Advanced', importance: 'Critical' },
      { id: 'do2', name: 'Docker Containers', category: 'DevOps', level: 'Advanced', importance: 'Critical' },
      { id: 'do3', name: 'Kubernetes (K8s)', category: 'DevOps', level: 'Intermediate', importance: 'High' },
      { id: 'do4', name: 'AWS / Cloud Services', category: 'Cloud', level: 'Intermediate', importance: 'Critical' },
      { id: 'do5', name: 'Terraform (IaC)', category: 'DevOps', level: 'Intermediate', importance: 'High' },
      { id: 'do6', name: 'CI/CD (GitHub Actions)', category: 'DevOps', level: 'Intermediate', importance: 'Critical' },
      { id: 'do7', name: 'Monitoring (Prometheus)', category: 'DevOps', level: 'Beginner', importance: 'Medium' }
    ],
    growthOutlook: '+31% Growth in Multi-Cloud Adoption'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Safeguard digital infrastructure, conduct vulnerability testing, and mitigate security threats.',
    matchScore: 58,
    demand: 'High',
    avgSalary: '₹8 - 19 LPA',
    color: 'rose',
    requiredSkills: [
      { id: 'sec1', name: 'Network Security', category: 'Networking', level: 'Advanced', importance: 'Critical' },
      { id: 'sec2', name: 'Linux Fundamentals', category: 'OS', level: 'Intermediate', importance: 'Critical' },
      { id: 'sec3', name: 'Penetration Testing', category: 'Security', level: 'Intermediate', importance: 'High' },
      { id: 'sec4', name: 'OWASP Top 10', category: 'AppSec', level: 'Intermediate', importance: 'Critical' },
      { id: 'sec5', name: 'Wireshark & Packet Analysis', category: 'Tools', level: 'Intermediate', importance: 'Medium' },
      { id: 'sec6', name: 'Cryptography Basics', category: 'Security', level: 'Intermediate', importance: 'High' }
    ],
    growthOutlook: '+35% Critical Demand worldwide'
  }
];

export const initialUser = {
  id: 'usr_001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@college.edu',
  college: 'National Institute of Technology',
  degree: 'B.Tech in Computer Science & Engineering',
  branch: 'Computer Science',
  semester: '6th Semester',
  cgpa: '8.45',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  targetCareerId: 'full-stack',
  profileScore: 85,
  careerReadiness: 72,
  userSkills: [
    { id: 'us1', name: 'JavaScript', proficiency: 'Advanced', category: 'Language' },
    { id: 'us2', name: 'React.js', proficiency: 'Intermediate', category: 'Frontend' },
    { id: 'us3', name: 'HTML/CSS', proficiency: 'Advanced', category: 'Frontend' },
    { id: 'us4', name: 'Tailwind CSS', proficiency: 'Intermediate', category: 'Frontend' },
    { id: 'us5', name: 'Node.js', proficiency: 'Intermediate', category: 'Backend' },
    { id: 'us6', name: 'REST APIs', proficiency: 'Intermediate', category: 'Backend' },
    { id: 'us7', name: 'Git & GitHub', proficiency: 'Intermediate', category: 'Tools' },
    { id: 'us8', name: 'SQL', proficiency: 'Beginner', category: 'Database' }
  ],
  assessmentHistory: [
    { id: 'att_1', quizTitle: 'Full-Stack Web Development', score: 80, totalQuestions: 5, date: '2026-10-25' },
    { id: 'att_2', quizTitle: 'Data Structures & Algorithms', score: 70, totalQuestions: 5, date: '2026-10-27' }
  ],
  notifications: [
    { id: 'n1', title: 'New Skill Roadmap Available', time: '1 hour ago', read: false },
    { id: 'n2', title: 'Resume Parsed Successfully: 9 Skills Extracted', time: '1 day ago', read: true },
    { id: 'n3', title: 'Quiz Score Updated: 80% on Full-Stack', time: '3 days ago', read: true }
  ]
};

export const sampleParsedResume = {
  fileName: 'Aarav_Sharma_Resume.pdf',
  fileSize: '412 KB',
  uploadTime: 'Just now',
  parsedInfo: {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    phone: '+91 98765 43210',
    education: 'B.Tech in Computer Science, NIT (2022 - 2026) | CGPA: 8.45',
    summary: 'Proactive Computer Science undergraduate skilled in modern JavaScript, React.js, and Node.js microservices. Proven experience developing full-stack academic web applications.',
    extractedSkills: [
      'React.js',
      'Node.js',
      'JavaScript',
      'HTML/CSS',
      'Tailwind CSS',
      'REST APIs',
      'Git & GitHub',
      'MongoDB',
      'SQL'
    ],
    projects: [
      {
        title: 'MERN E-Commerce Platform',
        tech: 'React, Node, Express, MongoDB, Stripe',
        desc: 'Built full-featured store with JWT auth, shopping cart, and order payment gateway.'
      },
      {
        title: 'AI Resume Keyword Extractor',
        tech: 'Python, Flask, spaCy',
        desc: 'Extracted key tech skills from candidate CVs with 91% precision.'
      }
    ],
    nlpMatchConfidence: 94
  }
};

export const mockQuizzes = [
  {
    id: 'quiz-fullstack',
    title: 'Full-Stack Web Development',
    description: 'Evaluate your knowledge in modern React, Node.js event loop, asynchronous handling, and REST architecture.',
    category: 'Web Development',
    timeLimit: 300, // 5 minutes
    totalQuestions: 5,
    difficulty: 'Intermediate',
    badgeColor: 'indigo',
    questions: [
      {
        id: 'q1',
        question: 'Which React hook should be used to perform side effects such as fetching data from an API?',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        correctIndex: 1,
        explanation: 'useEffect handles side-effects like data fetching, manual DOM manipulation, and subscriptions in functional components.'
      },
      {
        id: 'q2',
        question: 'What is the primary role of middleware in Express.js?',
        options: [
          'To directly manipulate the database indexes',
          'To execute code, modify request/response objects, and end or pass control in the request-response cycle',
          'To compile JSX templates on the server',
          'To manage frontend browser cookies exclusively'
        ],
        correctIndex: 1,
        explanation: 'Middleware functions have access to the request object (req), response object (res), and next middleware function in the application’s request-response cycle.'
      },
      {
        id: 'q3',
        question: 'Which HTTP method should be used for idempotent updates where the entire resource is replaced?',
        options: [
          'POST',
          'PATCH',
          'PUT',
          'DELETE'
        ],
        correctIndex: 2,
        explanation: 'PUT is idempotent and replaces the target resource entirely. PATCH applies partial modifications.'
      },
      {
        id: 'q4',
        question: 'In MongoDB, what does indexing on a collection field primarily improve?',
        options: [
          'Query execution speed during search queries',
          'Storage size compression',
          'Write speed during bulk inserts',
          'Network encryption speed'
        ],
        correctIndex: 0,
        explanation: 'Indexes support the efficient execution of queries in MongoDB by preventing full collection scans.'
      },
      {
        id: 'q5',
        question: 'What is the virtual DOM in React?',
        options: [
          'A direct replica of the browser window in C++',
          'A lightweight in-memory representation of the real DOM that optimizes UI re-rendering via diffing',
          'An external cloud database storing state',
          'A proprietary Google Chrome engine feature'
        ],
        correctIndex: 1,
        explanation: 'The Virtual DOM keeps a representation of UI components in memory and syncs with the real DOM efficiently through reconciliation diffing.'
      }
    ]
  },
  {
    id: 'quiz-dsa',
    title: 'Data Structures & Algorithms',
    description: 'Test your understanding of time complexity, arrays, binary trees, dynamic programming, and hash tables.',
    category: 'Core Computer Science',
    timeLimit: 300,
    totalQuestions: 5,
    difficulty: 'Hard',
    badgeColor: 'purple',
    questions: [
      {
        id: 'dsa1',
        question: 'What is the average time complexity for searching an element in a balanced Binary Search Tree (AVL / Red-Black)?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctIndex: 1,
        explanation: 'Because the height of a balanced BST is kept at O(log N), binary search operations take O(log N) time.'
      },
      {
        id: 'dsa2',
        question: 'Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?',
        options: [
          'Stack',
          'Queue',
          'Heap',
          'Disjoint Set'
        ],
        correctIndex: 1,
        explanation: 'BFS uses a FIFO Queue to visit neighbor vertices level by level.'
      },
      {
        id: 'dsa3',
        question: 'What collision resolution technique in Hash Tables uses linked lists at each bucket index?',
        options: [
          'Linear Probing',
          'Quadratic Probing',
          'Separate Chaining',
          'Double Hashing'
        ],
        correctIndex: 2,
        explanation: 'Separate chaining stores colliding keys in a linked list or chain attached to that bucket index.'
      },
      {
        id: 'dsa4',
        question: 'What is the space complexity of an in-place QuickSort algorithm (using auxiliary recursion stack)?',
        options: [
          'O(1)',
          'O(log N) average, O(N) worst case',
          'O(N)',
          'O(N^2)'
        ],
        correctIndex: 1,
        explanation: 'While QuickSort sorts in-place, the recursive call stack takes O(log N) space on average and O(N) in worst-case degenerate partitions.'
      },
      {
        id: 'dsa5',
        question: 'What algorithmic paradigm does the 0/1 Knapsack problem typically use for an optimal solution?',
        options: [
          'Greedy Algorithm',
          'Dynamic Programming',
          'Divide and Conquer',
          'Backtracking without memoization'
        ],
        correctIndex: 1,
        explanation: '0/1 Knapsack exhibits overlapping subproblems and optimal substructure, solved in pseudo-polynomial time O(N*W) using Dynamic Programming.'
      }
    ]
  },
  {
    id: 'quiz-aiml',
    title: 'Machine Learning & Python',
    description: 'Check your mastery of supervised learning, bias-variance tradeoff, evaluation metrics, and model tuning.',
    category: 'AI & Data Science',
    timeLimit: 300,
    totalQuestions: 5,
    difficulty: 'Intermediate',
    badgeColor: 'emerald',
    questions: [
      {
        id: 'ml_q1',
        question: 'When a model performs exceptionally well on training data but poorly on unseen test data, it is experiencing:',
        options: [
          'Underfitting (High Bias)',
          'Overfitting (High Variance)',
          'Data Drift',
          'Optimal Convergence'
        ],
        correctIndex: 1,
        explanation: 'Overfitting occurs when the model memorizes training noise and fails to generalize to test data.'
      },
      {
        id: 'ml_q2',
        question: 'Which metric is most appropriate for evaluating a highly imbalanced dataset (e.g. fraud detection)?',
        options: [
          'Accuracy',
          'Precision-Recall AUC / F1-Score',
          'Mean Squared Error',
          'R-Squared'
        ],
        correctIndex: 1,
        explanation: 'Accuracy is misleading on imbalanced classes; Precision, Recall, and F1-Score reflect real minority class performance.'
      },
      {
        id: 'ml_q3',
        question: 'In Random Forest algorithms, what technique is used to create diversity among individual decision trees?',
        options: [
          'Gradient Descent',
          'Bootstrap Aggregating (Bagging) & Random Feature Subsets',
          'Backpropagation',
          'Principal Component Projection'
        ],
        correctIndex: 1,
        explanation: 'Random Forest trains multiple trees on bootstrap data samples and selects random subsets of features at each split.'
      },
      {
        id: 'ml_q4',
        question: 'What is the primary function of an activation function (like ReLU) in a neural network?',
        options: [
          'To introduce non-linearity so the network can learn complex patterns',
          'To normalize the dataset to mean 0',
          'To increase the learning rate automatically',
          'To speed up CPU clock cycles'
        ],
        correctIndex: 0,
        explanation: 'Without non-linear activation functions, a multi-layer neural network collapses into a simple linear regression.'
      },
      {
        id: 'ml_q5',
        question: 'Which library is standard for fast array manipulation and vectorized computations in Python?',
        options: [
          'Pandas',
          'NumPy',
          'Matplotlib',
          'Requests'
        ],
        correctIndex: 1,
        explanation: 'NumPy provides C-optimized ndarray objects and mathematical routines for high-performance matrix and vector operations.'
      }
    ]
  }
];

export const mockRoadmapData = {
  'full-stack': {
    careerTitle: 'Full-Stack Web Developer',
    readinessScore: 72,
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Foundations & Modern JavaScript',
        duration: 'Weeks 1–3',
        description: 'Master core ES6+ paradigms, asynchronous promises, DOM concepts, and modular clean code.',
        milestones: [
          {
            id: 'm1',
            title: 'Deep Dive: Closures, Event Loop & Promises',
            status: 'completed',
            skills: ['JavaScript'],
            resource: {
              type: 'Course',
              title: 'JavaScript.info Complete Deep Dive',
              link: 'https://javascript.info'
            }
          },
          {
            id: 'm2',
            title: 'Modern CSS Frameworks & Responsive Design',
            status: 'completed',
            skills: ['Tailwind CSS', 'HTML/CSS'],
            resource: {
              type: 'Documentation',
              title: 'Tailwind CSS Official Guide',
              link: 'https://tailwindcss.com/docs'
            }
          },
          {
            id: 'm3',
            title: 'Git Branching & Collaborative Workflow',
            status: 'completed',
            skills: ['Git & GitHub'],
            resource: {
              type: 'Interactive Guide',
              title: 'Learn Git Branching Visually',
              link: 'https://learngitbranching.js.org'
            }
          }
        ]
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Frontend Mastery & State Management',
        duration: 'Weeks 4–7',
        description: 'Build responsive SPAs with modern React, hooks, context API, custom hooks, and component design systems.',
        milestones: [
          {
            id: 'm4',
            title: 'Advanced React Hooks & Performance (useMemo, useCallback)',
            status: 'completed',
            skills: ['React.js'],
            resource: {
              type: 'Tutorial',
              title: 'React Official Documentation (react.dev)',
              link: 'https://react.dev'
            }
          },
          {
            id: 'm5',
            title: 'Client-Side Routing & Global State Architecture',
            status: 'in-progress',
            skills: ['React.js', 'REST APIs'],
            resource: {
              type: 'Video Series',
              title: 'Full React Router v6 & Context API Masterclass',
              link: 'https://youtube.com'
            }
          },
          {
            id: 'm6',
            title: 'API Integration with Axios Interceptors & React Query',
            status: 'in-progress',
            skills: ['REST APIs', 'React.js'],
            resource: {
              type: 'Guide',
              title: 'TanStack Query / Axios Best Practices',
              link: 'https://tanstack.com/query'
            }
          }
        ]
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Backend Services & Database Integration',
        duration: 'Weeks 8–12',
        description: 'Design robust RESTful APIs, authenticate with JWT tokens, and integrate MongoDB/PostgreSQL persistence.',
        milestones: [
          {
            id: 'm7',
            title: 'Node.js & Express.js REST API with JWT Auth',
            status: 'in-progress',
            skills: ['Node.js', 'REST APIs'],
            resource: {
              type: 'Tutorial',
              title: 'Secure JWT Authentication in Express.js',
              link: 'https://jwt.io/introduction'
            }
          },
          {
            id: 'm8',
            title: 'Database Schema Design & Aggregation Pipelines (MongoDB & PostgreSQL)',
            status: 'pending',
            isGap: true,
            skills: ['MongoDB', 'PostgreSQL'],
            resource: {
              type: 'Course',
              title: 'MongoDB University - Schema Design & Mongoose',
              link: 'https://learn.mongodb.com'
            }
          },
          {
            id: 'm9',
            title: 'API Security, Rate Limiting, CORS & Error Handling Middleware',
            status: 'pending',
            skills: ['Node.js'],
            resource: {
              type: 'Article',
              title: 'OWASP REST Security Best Practices',
              link: 'https://owasp.org'
            }
          }
        ]
      },
      {
        id: 'phase-4',
        title: 'Phase 4: DevOps, Cloud Deployment & Capstone Portfolio',
        duration: 'Weeks 13–16',
        description: 'Containerize microservices with Docker, automate deployment with GitHub Actions, and prepare for interviews.',
        milestones: [
          {
            id: 'm10',
            title: 'Dockerizing Full-Stack MERN Applications',
            status: 'pending',
            isGap: true,
            skills: ['Docker'],
            resource: {
              type: 'Course',
              title: 'Docker for Developers - Zero to Hero',
              link: 'https://docs.docker.com/get-started/'
            }
          },
          {
            id: 'm11',
            title: 'Automated CI/CD with GitHub Actions to Cloud (Render / AWS)',
            status: 'pending',
            isGap: true,
            skills: ['CI/CD Pipelines'],
            resource: {
              type: 'Guide',
              title: 'Deploy Full-Stack Apps to Free Cloud Tiers',
              link: 'https://render.com/docs'
            }
          },
          {
            id: 'm12',
            title: 'Capstone Project: AI-Integrated SaaS Platform with Documentation',
            status: 'pending',
            skills: ['React.js', 'Node.js', 'MongoDB', 'Docker'],
            resource: {
              type: 'Project Specification',
              title: 'Production Capstone Architecture Guide',
              link: 'https://github.com'
            }
          }
        ]
      }
    ]
  }
};
