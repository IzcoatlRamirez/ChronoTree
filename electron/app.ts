import express from 'express';
import authRoutes from './routes/auth.routes'
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173', // o '*', para permitir desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  };

const app = express();
app.use(cors(corsOptions))
app.use(express.json())


app.use('/api',authRoutes)



export default app;