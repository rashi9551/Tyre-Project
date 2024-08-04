import Authority from "../model/Authority.js"
import Order from "../model/order.js";
import { addMonths, format } from 'date-fns';

export default class repo {

    login = async (data) => {
        try {
            const checkAuthority = await Authority.findOne({ shopName: data.shopName })
            if (!checkAuthority) {
                return { message: false }
            }
            console.log(data, checkAuthority);
            const isMatch = await checkAuthority.matchPassword(data.password)
            console.log(isMatch);
            if (isMatch) {
                return { message: true, checkAuthority }
            } else {
                return { message: false }
            }
        } catch (error) {
            console.log(error);
        }
    }
    saveAuthority = async (data) => {
        try {
            const checkAuthority = await Authority.findOne({ shopName: data.shopName })
            console.log(checkAuthority);
            if (checkAuthority) {
                return ({ message: "already authority axists" })
            }
            const Authorities = new Authority(data)
            const savedAuthority = await Authorities.save()
            console.log(savedAuthority);
            return savedAuthority
        } catch (error) {
            console.log(error);
        }
    }
    order = async (data) => {
        try {
            console.log('ppp----', data.formData);
            const { shopName, category, formData: { name, phone, productName, amount, vehicleNumber, dueDate, dueDateType } } = data;
            let dueDateCalculated;
            if (dueDateType == 'year') {
                dueDateCalculated = addYears(new Date(), parseInt(dueDate, 10) || 0);
            } else {
                dueDateCalculated = addMonths(new Date(), parseInt(dueDate, 10) || 0);
            }

            console.log(format(dueDateCalculated, 'yyyy-MM-dd'));
            const order = new Order({
                name, shopName, phone, productName, amount, vehicleNumber, category,
                date: new Date(),
                dueDate: dueDateCalculated
            });
            const orderCreated = await order.save()
            console.log(orderCreated);
            return { ...orderCreated, message: true }
        } catch (error) {
            console.log(error);
        }
    }
    getOrders = async () => {
        try {
            const orders = await Order.find()
            return orders
        } catch (error) {
            console.log(error);
        }
    }
    getAuthority = async () => {
        try {
            const authority = await Authority.find()
            console.log(authority);
            return authority
        } catch (error) {
            console.log(error);
        }
    }
    graphData = async (shopName) => {
        try {
            const authority = await Order.find()
            console.log(authority);
            return authority
        } catch (error) {
            console.log(error);
        }
    }
}
