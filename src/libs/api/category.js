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

export async function addCategory(data) {
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

export async function deleteCategory(id) {
  const result = await axios.delete(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}

export async function updateCategory(id, data) {
  const result = await axios.put(`${url}/${id}`, data, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}