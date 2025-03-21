import express from 'express';
import dotenv from 'dotenv';
import { router as authRoutes } from './routes/authRoutes';
import { router as confluenceRoutes } from './routes/confluenceRoutes';
import { EMPTY_STRING } from './consts';

dotenv.config();

export const app = express();

const port = process.env.PORT || 3000;
const clientSecret = process.env.CLIENT_SECRET || EMPTY_STRING;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running. Navigate to /auth/login to test OAuth.');
});

app.use('/auth', authRoutes);
app.use('/confluence', confluenceRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
