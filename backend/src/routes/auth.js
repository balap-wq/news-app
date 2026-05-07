import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/google', (req, res, next) => {
  const prompt = req.query.prompt || 'none';
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt, // ← passes 'select_account' from frontend
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        favoriteCategories: req.user.favoriteCategories,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // :white_check_mark: FIXED: Set cookie with domain-safe options for local dev
    // Also pass token in URL so frontend can store it if cookie is dropped
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // false for localhost dev
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // :white_check_mark: Pass token in URL so AuthSuccess can store it as fallback
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// :white_check_mark: Reads JWT from cookie OR Authorization header
router.get('/me', (req, res) => {
  // Try cookie first
  let token = req.cookies?.jwt;

  // :white_check_mark: Fallback: read from Authorization header (sent by frontend if no cookie)
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader?.split(' ')[1];
  }

  if (!token) {
    return res.status(200).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch {
    return res.status(200).json({ user: null });
  }
});

// :white_check_mark: Clears cookie on logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
  res.json({ message: 'Logged out' });
});

export default router;
