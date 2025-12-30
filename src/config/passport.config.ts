import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../services/auth.service";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configure Passport with Google OAuth Strategy
 */
export const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: process.env.GOOGLE_CALLBACK_URL!,
                scope: ["profile", "email"],
            },
            async (
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ) => {
                try {
                    // Find or create user
                    const user = await AuthService.findOrCreateGoogleUser(profile);
                    done(null, user);
                } catch (error) {
                    console.error("Google Strategy error:", error);
                    done(error as Error, undefined);
                }
            }
        )
    );

    // Serialize user for session (not used with JWT, but required by Passport)
    passport.serializeUser((user: any, done) => {
        done(null, user._id);
    });

    // Deserialize user from session (not used with JWT, but required by Passport)
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await AuthService.getUserById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};
