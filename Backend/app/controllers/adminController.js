import repo from "../repository/repo.js"
import { createToken } from "../utils/jwt.js"
const repository=new repo()

export default class adminControl {

    login=async(req,res)=>{
        try {
            const {name ,password}=req.body
            if(name===process.env.admin&& password===process.env.password){
                const token=await createToken(name,'7d')
                res.status(200).json({message:"Success",token})

            }else{
                res.status(200).json({message:"unAuthorised"})
            }
        } catch (error) {
            console.log(error);
        }
    }

    getOrders=async(req,res)=>{
        try {
            const response= await repository.getOrders()
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }
    getAuthority=async(req,res)=>{
        try {
            const response= await repository.getAuthority()
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }

    




  }
 