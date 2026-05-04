import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

const router = Router()

/**
 * POST /users
 * Create user on first login. If email already exists, return existing user.
 * Body: { name, email, profileImage?, favoriteCategories? }
 */
router.post('/', async (req, res) => {
  const { name, email, profileImage, favoriteCategories } = req.body

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'name and email are required',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    })
  }

  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
      // Return existing user (idempotent — safe to call on every login)
      return res.status(200).json({
        success: true,
        created: false,
        user: existing,
      })
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profileImage:       profileImage ?? null,
        favoriteCategories: Array.isArray(favoriteCategories) ? favoriteCategories : [],
      },
    })

    return res.status(201).json({
      success: true,
      created: true,
      user,
    })
  } catch (err) {
    // P2002 = Prisma unique constraint violation (race condition safety net)
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      })
    }
    console.error(err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * GET /users/:id
 * Fetch a user by their ID.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ success: false, error: 'id is required' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    return res.status(200).json({ success: true, user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router