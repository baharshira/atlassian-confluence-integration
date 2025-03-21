import axios from 'axios';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { EMPTY_STRING } from '../consts';
import { HandleAuthCallbackArgs } from '../types';

dotenv.config(); 

const CLIENT_ID: string = process.env.CLIENT_ID || EMPTY_STRING;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET || EMPTY_STRING;
const REDIRECT_URI: string  = process.env.REDIRECT_URI || EMPTY_STRING;

async function handleAuthCallback({code, req, res}: HandleAuthCallbackArgs) {
    const accessToken = await exchangeAuthorizationCodeForAccessToken(code);
    const cloudId = await getCloudId(accessToken);
    saveTokenData(accessToken, cloudId);
    res.redirect('/confluence/pages');
}

async function exchangeAuthorizationCodeForAccessToken(code: string) {
    const url = 'https://auth.atlassian.com/oauth/token';
    const data = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
    };
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.access_token;
    } catch (error: any) {
        console.error('Failed to exchange token:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getCloudId(accessToken: string) {
    const url = 'https://api.atlassian.com/oauth/token/accessible-resources';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        const cloudId: string = response.data[0].id;
        return cloudId;
    } catch (error) {
        console.error('Failed to retrieve Cloud ID: ', error);
        throw error;
    }
}

async function saveTokenData(accessToken: string, cloudId: string) {
    const filePath = path.join(__dirname, 'tokens.json');
    const data = { accessToken, cloudId };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getTokenData() {
    const filePath = path.join(__dirname, 'tokens.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export const authService = { handleAuthCallback }
