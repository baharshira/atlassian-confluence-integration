import { Request, Response } from 'express';

export type FetchConfluencePagesListArgs = {
    accessToken: string;
    cloudId: string;
    req: Request; 
    res: Response;
}

export type HandleAuthCallbackArgs = {
    code: string;
    req: Request;
    res: Response;
}