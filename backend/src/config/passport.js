import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../prismaClient.js'; // ← only this line changes

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await prisma.user.upsert({
            where: { email: profile.emails[0].value },
            update: {
              name: profile.displayName,
              profileImage: profile.photos[0]?.value ?? null,
            },
            create: {
              name: profile.displayName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0]?.value ?? null,
              favoriteCategories: [],
            },
          });
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

export default passport;
