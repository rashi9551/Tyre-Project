import express from 'express';
import Controller from '../controllers/controller.js';
import { verifyToken } from '../utils/jwt.js';
const route = express.Router();
const controll=new Controller()

route.post('/signup', controll.signup);
route.post('/login', controll.login);
route.post('/order', verifyToken,controll.order);
route.get('/getOrders',verifyToken, controll.getOrders);
route.get('/sendMessage',verifyToken, controll.sendMessage);


export default route;
