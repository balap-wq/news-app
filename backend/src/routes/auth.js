import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax', // ← 'none' required for cross-origin cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.get('/google', (req, res, next) => {
  const prompt = req.query.prompt || 'none';
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt,
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/headlines`,
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

    res.cookie('jwt', token, cookieOptions);
    res.redirect(`${process.env.CLIENT_URL}/auth/success`);
  }
);

// Reads JWT from cookie and returns user
router.get('/me', (req, res) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(200).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch {
    return res.status(200).json({ user: null });
  }
});

// Clears cookie on logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax', // ← must match set options exactly
  });
  res.status(200).json({ message: 'Logged out' });
});

export default router;
