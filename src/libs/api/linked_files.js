import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/documents`

export async function getLinkedFilesOf(module, id) {
    const result = await axios.get(
        url,
        {
          params: {
            DOLAPIKEY: apiKey,
            modulepart: module,
            id: id
          }
        }
      )
    
      return result
}