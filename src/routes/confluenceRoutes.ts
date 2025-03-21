import { Router } from 'express';
import { fetchConfluencePagesList } from '../controllers/confluenceController';

const router = Router();

router.get('/pages', fetchConfluencePagesList);

export { router };