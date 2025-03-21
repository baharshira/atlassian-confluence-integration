import express from 'express';
import dotenv from 'dotenv';
import { router as authRoutes } from './routes/authRoutes';
import { router as confluenceRoutes } from './routes/confluenceRoutes';

dotenv.config();

const port = process.env.PORT || 3000;

export const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Server is running. Navigate to /auth/login to test OAuth.');
});

app.use('/auth', authRoutes);
app.use('/confluence', confluenceRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
