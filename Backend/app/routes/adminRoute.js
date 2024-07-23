import express from 'express';
import adminController from '../controllers/adminController.js';


const adminRoute = express.Router();
const adminControl=new adminController()
adminRoute.post('/login', adminControl.login);
adminRoute.get('/getOrders', adminControl.getOrders);
adminRoute.get('/getAuthority', adminControl.getAuthority);

export default adminRoute;
