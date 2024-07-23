import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const authoritySchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  phone: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

authoritySchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authoritySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Authority = mongoose.model('Authority', authoritySchema);
export default Authority;
