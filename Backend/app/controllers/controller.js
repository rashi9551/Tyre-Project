import { response } from "express"
import repo from "../repository/repo.js"
import {createToken} from '../utils/jwt.js'
const repository=new repo()

export default class Controller {

    signup=async(req,res)=>{
        try {
            const data =req.body
            const reponse= await repository.saveAuthority(data)
            res.status(200).json(reponse)
        } catch (error) {
            console.log(error);
        }
    }
    login=async(req,res)=>{
        try {
            const data =req.body
            const response= await repository.login(data)
            console.log(response);
            if(response.message)
            {
                const token=await createToken(response._id,'7d')
                res.status(200).json({token,...response})
            }else{
                res.status(403).json({message:false})
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    order=async(req,res)=>{
        try {
            const data =req.body
            const response= await repository.order(data)
            res.status(200).json(response)
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
 