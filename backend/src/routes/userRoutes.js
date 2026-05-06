import { Router } from 'express';
import prisma from '../prismaClient.js';
const router = Router();

/**
 * POST /users
 * Create user on first login. If email already exists, return existing user.
 * Body: { name, email, profileImage?, favoriteCategories? }
 */
router.post('/', async (req, res) => {
  const { name, email, profileImage, favoriteCategories } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'name and email are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res.status(200).json({
        success: true,
        created: false,
        user: existing,
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        profileImage: profileImage ?? null,
        favoriteCategories: Array.isArray(favoriteCategories) ? favoriteCategories : [],
      },
    });

    return res.status(201).json({
      success: true,
      created: true,
      user,
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/**
 * GET /users/:id
 * Fetch a user by their ID.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, error: 'id is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ← NEW: added below — nothing above changed
/**
 * PATCH /users/:id
 * Update favourite categories for a user.
 * Body: { favoriteCategories: string[] }
 */
router.patch('/:id', async (req, res) => {
  const { favoriteCategories } = req.body;

  if (!Array.isArray(favoriteCategories)) {
    return res.status(400).json({
      success: false,
      error: 'favoriteCategories must be an array',
    });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { favoriteCategories },
    });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
