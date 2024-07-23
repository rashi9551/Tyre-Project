import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import 'dotenv/config';
import route from './routes/route.js'
import adminRoute from './routes/adminRoute.js'
import { limiter } from './utils/rateLimitter.js'
import connectDB from './model/mongodb.js'

const PORT = process.env.PORT || 3000; 
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    })
);
app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(limiter)

app.use('/', route);
app.use('/admin', adminRoute);

connectDB()
app.listen(PORT, () => {
  console.log(`The service is running on port ${PORT}`);
});
