import { User, IUser } from "../models/User";
import { generateTokenPair, verifyRefreshToken } from "../utils/jwt.utils";

export class AuthService {
    /**
     * Find or Create User from Google OAuth Profile
     */
    static async findOrCreateGoogleUser(profile: any): Promise<IUser> {
        try {
            // Check if user already exists
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // Update last login
                user.lastLogin = new Date();
                await user.save();
                return user;
            }

            // Create new user
            user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value || "",
                name: profile.displayName || profile.name?.givenName || "User",
                avatar: profile.photos?.[0]?.value || null,
                role: "user",
                preferences: {
                    favoriteOpenings: [],
                    savedPlayers: [],
                    theme: "dark",
                },
                refreshTokens: [],
                lastLogin: new Date(),
            });

            console.log(`New user created: ${user.email}`);
            return user;
        } catch (error) {
            console.error("Error in findOrCreateGoogleUser:", error);
            throw new Error("Failed to authenticate user");
        }
    }

    /**
     * Save Refresh Token to User
     */
    static async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            // Limit to 5 refresh tokens (5 devices max)
            if (user.refreshTokens.length >= 5) {
                user.refreshTokens.shift(); // Remove oldest token
            }

            user.refreshTokens.push(refreshToken);
            await user.save();
        } catch (error) {
            console.error("Error saving refresh token:", error);
            throw error;
        }
    }

    /**
     * Remove Refresh Token (Logout)
     */
    static async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
            await user.save();
        } catch (error) {
            console.error("Error removing refresh token:", error);
            throw error;
        }
    }

    /**
     * Refresh Access Token
     */
    static async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            // Verify refresh token
            const decoded = verifyRefreshToken(refreshToken);

            // Find user and check if refresh token exists
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error("User not found");
            }

            if (!user.refreshTokens.includes(refreshToken)) {
                throw new Error("Invalid refresh token");
            }

            // Generate new access token
            const { accessToken } = generateTokenPair(user);

            return { accessToken };
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw new Error("Failed to refresh token");
        }
    }

    /**
     * Logout from all devices
     */
    static async logoutAllDevices(userId: string): Promise<void> {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            user.refreshTokens = [];
            await user.save();
        } catch (error) {
            console.error("Error logging out all devices:", error);
            throw error;
        }
    }

    /**
     * Get User by ID
     */
    static async getUserById(userId: string): Promise<IUser | null> {
        try {
            return await User.findById(userId).select("-refreshTokens");
        } catch (error) {
            console.error("Error getting user:", error);
            return null;
        }
    }

    /**
     * Update User Profile
     */
    static async updateUserProfile(
        userId: string,
        updates: Partial<{
            name: string;
            chessUsername: string;
            preferences: IUser["preferences"];
        }>
    ): Promise<IUser | null> {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updates },
                { new: true, runValidators: true }
            ).select("-refreshTokens");

            return user;
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw new Error("Failed to update profile");
        }
    }

    /**
     * Delete User Account
     */
    static async deleteUserAccount(userId: string): Promise<void> {
        try {
            await User.findByIdAndDelete(userId);
            console.log(`User account deleted: ${userId}`);
        } catch (error) {
            console.error("Error deleting user account:", error);
            throw new Error("Failed to delete account");
        }
    }
}
