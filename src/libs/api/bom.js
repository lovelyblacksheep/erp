import axios from 'axios'
import { apiKey, apiUrl } from '@/config'
import { getEvents } from './event'

const url = `${apiUrl}/boms`

export async function getBoms({ limit, page }) {
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

export async function getLastBom({}) {
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

export async function addBom(data) {
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

export async function getBom(id) {
  const result = await axios.get(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}

export async function deleteBom(id) {
  const result = await axios.delete(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}

export async function updateBom(data, id) {
  try {
    const response = await axios.put(`${url}/${id}`, data, {
      params: {
        DOLAPIKEY: apiKey
      }
    })
    return { success: true, ...response.data }
  } catch (error) {
    return { success: false, ...error.response.data }
  }
}

export async function getEventsForBom(id) {
  let r = await getEvents();
  let aev = [];
  r.data.map((ev) => {
      if(ev.elementtype === null && ev.socid === id) {
          aev.push(ev);
      }
  });
  return {
      status: 200,
      data: aev
  };
}