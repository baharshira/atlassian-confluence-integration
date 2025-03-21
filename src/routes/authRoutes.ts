import { Router } from 'express';
import { redirectToAuthPage, handleAuthCallback } from '../controllers/authController';

const router = Router();

router.get('/login', redirectToAuthPage);
router.get('/callback', handleAuthCallback);

export { router };
