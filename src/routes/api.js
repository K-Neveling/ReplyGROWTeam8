import { Router } from 'express';
import { validateSubmission } from '../utils/validator.js';

const router = Router();

// In-memory demo data store for hackathon rapid prototyping
const demoProjects = [
  {
    id: '1',
    title: 'Accessible Carbon Footprint Tracker',
    category: 'Sustainability',
    status: 'In Progress',
    description:
      'High-contrast, screen-reader optimized dashboard tracking energy consumption with keyboard-only navigation.',
    stars: 12,
  },
  {
    id: '2',
    title: 'AI Sign Language Video Interpreter',
    category: 'Assistive Tech',
    status: 'Prototype',
    description:
      'Real-time webcam translation of sign language into subtitles with customizable text-to-speech fallback.',
    stars: 28,
  },
  {
    id: '3',
    title: 'Community Skill Exchange Network',
    category: 'Social Impact',
    status: 'Planned',
    description:
      'Peer-to-peer tutoring platform with WCAG AA compliance and multi-language support.',
    stars: 19,
  },
];

/**
 * Health check endpoint
 * GET /api/v1/health
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
    },
  });
});

/**
 * List projects endpoint with category filter
 * GET /api/v1/projects?category=Sustainability
 */
router.get('/projects', (req, res) => {
  const { category, search } = req.query;
  let results = [...demoProjects];

  if (category && category !== 'All') {
    results = results.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const query = String(search).toLowerCase();
    results = results.filter(
      (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  res.status(200).json({
    success: true,
    data: results,
    meta: {
      total: results.length,
    },
  });
});

/**
 * Create a new hackathon project submission
 * POST /api/v1/projects
 */
router.post('/projects', (req, res) => {
  const validation = validateSubmission(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid project submission.',
        details: validation.errors,
      },
    });
  }

  const newProject = {
    id: String(Date.now()),
    title: req.body.title.trim(),
    category: req.body.category || 'General',
    status: 'Proposed',
    description: req.body.description.trim(),
    stars: 0,
    createdAt: new Date().toISOString(),
  };

  demoProjects.unshift(newProject);

  res.status(201).json({
    success: true,
    data: newProject,
    message: 'Project created successfully!',
  });
});

export default router;
