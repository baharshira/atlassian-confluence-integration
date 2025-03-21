import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { SCOPES, EMPTY_STRING } from '../consts'
import dotenv from 'dotenv'

dotenv.config();

const CLIENT_ID: string = process.env.CLIENT_ID || EMPTY_STRING;
const REDIRECT_URI: string  = process.env.REDIRECT_URI || EMPTY_STRING;

export function redirectToAuthPage(req: Request, res: Response): void {
    const authUrl: string = `https://auth.atlassian.com/authorize?` +
    `audience=api.atlassian.com&` +
    `client_id=${CLIENT_ID}&` +
    `scope=${SCOPES}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=code&` +
    `prompt=consent`;
    res.redirect(authUrl);
}

export async function handleAuthCallback(req: Request, res: Response): Promise<void> {
    const code = req.query.code as string;
    if (!code) {
        res.status(400).json({ message: 'Authorization code is missing.' });
    }
    try {
        await authService.handleAuthCallback({code, req, res});
    } catch (error) {
        console.error('Error during authorization process: ', error);
        throw error;
    }
}
