import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/contacts`

export async function getContactsOf(module, id) {
  let k = module === 'thirdparty' ? 'thirdparty_ids' : ''
  const result = await axios.get(url, {
    params: {
      DOLAPIKEY: apiKey,
      [k]: id,
      sortfield: 't.rowid',
      sortorder: 'ASC',
      limit: 100
    }
  })

  return result
}

export async function addContact(data) {
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

export async function getThirdParties() {
  const result = await axios.get(`${apiUrl}/thirdparties`, {
    params: {
      DOLAPIKEY: apiKey,
      sortfield: 't.rowid',
      sortorder: 'ASC',
      limit: 100
    }
  })

  return result
}
