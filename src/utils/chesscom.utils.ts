import axios from "axios";

/**
 * Validate if a Chess.com username exists
 * @param username - Chess.com username to validate
 * @returns true if user exists, false otherwise
 */
export const validateChessComUsername = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.get(
            `https://api.chess.com/pub/player/${username.toLowerCase()}`,
            { timeout: 5000 }
        );
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

/**
 * Get Chess.com player basic info
 * @param username - Chess.com username
 * @returns Player info or null if not found
 */
export const getChessComPlayerInfo = async (username: string): Promise<any> => {
    try {
        const response = await axios.get(
            `https://api.chess.com/pub/player/${username.toLowerCase()}`,
            { timeout: 5000 }
        );
        return response.data;
    } catch (error) {
        return null;
    }
};
