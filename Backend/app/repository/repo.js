import Authority from "../model/Authority.js"
import Order from "../model/order.js";
import { addMonths, format } from 'date-fns';

export default class repo{
    saveAuthority=async(data)=>{
        try {
            const checkAuthority=await Authority.findOne({shopName:data.shopName})
            console.log(checkAuthority);
            if(checkAuthority)
            {
                return({message:"already authority axists"})
            }
            const Authority =new Authority(data)
            const saveAuthority=await Authority.save()
            console.log(saveAuthority);
            return saveAuthority
        } catch (error) {
            console.log(error);
        }
    }
    login=async(data)=>{
        try {
            const checkAuthority=await Authority.findOne({shopName:data.shopName})
            console.log(data);
            const isMatch=await checkAuthority.matchPassword(data.password)
            console.log(isMatch);
            if(isMatch){
                return {message:true,checkAuthority}
            }else{
                return {message:false}
            }
        } catch (error) {
            console.log(error);
        }
    }
    order=async(data)=>{
        try {
        const { dueDate, ...orderData } = data;
        const dueDateCalculated = addMonths(new Date(), parseInt(dueDate, 10) || 0);
        console.log(format(dueDateCalculated, 'yyyy-MM-dd'));
        const order = new Order({
            ...orderData,
            date: new Date(), 
            dueDate: dueDateCalculated 
        });
            const orderCreated=await order.save()
            console.log(orderCreated);
            return orderCreated
        } catch (error) {
            console.log(error);
        }
    }
    getOrders=async()=>{
        try {
        const orders=await Order.find()
        return orders
        } catch (error) {
            console.log(error);
        }
    }
    getAuthority=async()=>{
        try {
        const orders=await Authority.find()
        return orders
        } catch (error) {
            console.log(error);
        }
    }
}