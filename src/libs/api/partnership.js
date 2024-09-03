import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/partnerships/partnerships`

export async function getPartnerships({ limit, page, mode }) {
    const result = await axios.get(url, {
        params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: limit || 100,
            page: page || 0,
            DOLAPIKEY: apiKey
        }
    })

    return result
}

export async function addPartnership(data) {
    try {
      const response = await axios.post(url, data, {
        params: {
          DOLAPIKEY: apiKey
        }
      })
      return { success: true, ...response.data }
    } catch (error) {
      return { success: false, ...error.response.data }
    }
  }
  

export async function fetchLastPartnershipData({ }) {
    const result = await axios.get(url, {
        params: {
            sortfield: 't.rowid',
            sortorder: 'DESC',
            limit: 1,
            page: 0,
            DOLAPIKEY: apiKey
        }
    })

    return result
}

// fetchLastPartnershipData