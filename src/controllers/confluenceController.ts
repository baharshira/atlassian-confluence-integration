import { Request, Response } from 'express';
import { getConfluencePagesList } from '../services/confluenceService';

export async function fetchConfluencePagesList(req: Request, res: Response): Promise<void> {
    try {
        const pages =  await getConfluencePagesList();
        res.status(200).json({ pages });
    } catch (error) {
        console.error('Error fetching Confluence page:', error);
        throw error;
    }
}
