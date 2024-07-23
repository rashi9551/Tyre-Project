import mongoose from 'mongoose';
import Authority from './Authority.js'

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  shopName: {
    type: String, 
    required: true,
    ref: 'Authority' 
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
