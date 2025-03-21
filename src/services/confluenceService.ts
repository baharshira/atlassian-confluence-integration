import axios from 'axios';
import { getTokenData } from './authService'

export async function getConfluencePagesList() {
    const { accessToken, cloudId } = await getTokenData();
    const url = constructConfluenceApiUrl(cloudId);
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Confluence pages: ', error);
        throw error;
    }
}

function constructConfluenceApiUrl(cloudId: string) {
    return `https://api.atlassian.com/ex/confluence/${cloudId}/rest/api/content`;
}

