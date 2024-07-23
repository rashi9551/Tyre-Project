import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const createToken = async (auth_id, expire) => {
    try {
        const jwtSecretKey = process.env.USER_SECRET_KEY || "Rashid";
        const token = await jwt.sign({ auth_id }, jwtSecretKey, { expiresIn: expire });
        return token;
    } catch (error) {
        console.log(error);
        return "something went wrong";
    }
};

export const verifyOtpToken = (token) => {
    const secretKey = process.env.USER_SECRET_KEY || "Rashid";
    console.log(token);
    try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log(decodedToken, "decode");
        return decodedToken;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return { message: "invalid otp" };
    }
};


