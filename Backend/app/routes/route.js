import express from 'express';
import Controller from '../controllers/controller.js';
const route = express.Router();
const controll=new Controller()

route.post('/signup', controll.signup);
route.post('/login', controll.login);
route.post('/order', controll.order);
route.get('/getOrders', controll.getOrders);
route.get('/getAuthority', controll.getAuthority);


export default route;
