import express, { Request, Response } from 'express';
import authRouter from './routes/auth.js'

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: "Hello" });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    "status": "UP"
  });
});

export default app;