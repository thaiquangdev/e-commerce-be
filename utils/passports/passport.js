import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../../models/user.model.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5500/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const response = await User.create({
        email: profile.emails[0].value,
        username: profile.displayName,
      });
      console.log(profile);
      return done(null, profile);
    }
  )
);

export default passport;
