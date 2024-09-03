import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/users`

export async function getUser() {
    const result = await axios.get(url+"/info", {
        params: {
            DOLAPIKEY: apiKey
        }
    });
    return result;
}