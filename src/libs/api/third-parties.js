import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/thirdparties`

export async function getThirdParties({ limit, page }) {
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

export async function addThirdParty(data) {
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

export async function getThirdParty(id) {
  const result = await axios.get(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}
