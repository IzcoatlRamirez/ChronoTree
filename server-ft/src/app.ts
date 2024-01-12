import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import NodeRoutes from './routes/nodes.routes';
import cookieParser from 'cookie-parser';


const corsOptions = {
    origin: 'http://localhost:1420',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api',authRoutes)
app.use('/api',NodeRoutes)

export default app;
