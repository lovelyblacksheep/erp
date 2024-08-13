import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/thirdparties`

export async function getThirdParties({ limit, page }) {
  const result = await axios.get(url, {
    params: {
      sortfield: 't.rowid',
      sortorder: 'ASC',
      limit: limit || 10,
      page: page || 0,
      DOLAPIKEY: apiKey
    }
  })

  return result
}
