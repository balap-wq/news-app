import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

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
          const email =
            profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

          if (!email) {
            return done(null, false, { message: 'No email returned from Google' });
          }

          const name =
            profile.displayName ||
            (profile.name ? `${profile.name.givenName} ${profile.name.familyName}` : 'Google User');

          const picture =
            profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;

          const user = {
            id: profile.id,
            email,
            name,
            picture,
          };

          return done(null, user);
        } catch (error) {
          if (error.name === 'TypeError') {
            return done(null, false, { message: 'Invalid Google profile data' });
          }
          return done(error, null);
        }
      }
    )
  );
}

export default passport;
