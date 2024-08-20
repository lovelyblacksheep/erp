import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/categories`

export async function getCategory(id) {
    const result = await axios.get(`${url}/${id}?include_childs=true`, {
        params: {
            DOLAPIKEY: apiKey
        }
    })

    return result
}

export async function getCategoryCustomerObjects(id) {
    const result = await axios.get(`${url}/${id}/objects?type=customer`, {
        params: {
            DOLAPIKEY: apiKey
        }
    })

    return result
}