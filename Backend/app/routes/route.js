import express from 'express';
import Controller from '../controllers/controller.js';
import { verifyToken } from '../utils/jwt.js';
const route = express.Router();
const controll = new Controller()

route.post('/signup', controll.signup);
route.post('/login', controll.login);
route.post('/orderAlign', verifyToken, controll.orderAlign);
route.post('/orderOil', verifyToken, controll.orderOil);
route.get('/getOrders', verifyToken, controll.getOrders);
route.get('/sendMessage', verifyToken, controll.sendMessage);
route.get('/graphdata', verifyToken, controll.getGraphData);
route.post('/orderTyre', verifyToken, controll.orderTyre);



export default route;
