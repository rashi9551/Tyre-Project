import express from 'express';
import adminController from '../controllers/adminController.js';
import { verifyToken } from '../utils/jwt.js';

const adminRoute = express.Router();
const adminControl=new adminController()
adminRoute.post('/login', adminControl.login);
adminRoute.get('/getOrders', verifyToken,adminControl.getOrders);
adminRoute.get('/getAuthority',verifyToken, adminControl.getAuthority);

export default adminRoute;
