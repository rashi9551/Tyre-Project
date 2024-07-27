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

export const verifyToken = async(req, res) => {
    try{
        console.log("token validating  ");
        const token = call.request.token || '';            
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN || "Rashid" )
        if(!decoded){
            throw new Error('Invalid token')
        }
        res.status(201).res.json({userId : decoded.id, role: decoded.role})
    }catch(e){
        res.status(401).res.json({message:"something gone wrong in authentication"})
     }
}


