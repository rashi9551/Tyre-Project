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

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.trim().split(" ")[1]; console.log("token validating  ", req.body);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN || "Rashid")
        if (!decoded) {
            throw new Error('Invalid token')
        }
        next();
    } catch (e) {
        res.status(401).json({ message: "something gone wrong in authentication" })
    }
}


