import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/thirdparties`

export async function getThirdParties({ limit, page, mode }) {
  const result = await axios.get(url, {
    params: {
      sortfield: 't.rowid',
      sortorder: 'ASC',
      limit: limit || 100,
      page: page || 0,
      mode: mode,
      DOLAPIKEY: apiKey
    }
  })

  return result
}

export async function getEveryThirdParties() {
  const result = await axios.get(url, {
    params: {
      sortfield: 't.rowid',
      sortorder: 'ASC',
      DOLAPIKEY: apiKey,
      limit: 100
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

export async function deleteThirdParty(id) {
  const result = await axios.delete(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}


export async function updateThirdParty(data, id) {
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

export async function getThirdParty(id) {
  const result = await axios.get(`${url}/${id}`, {
    params: {
      DOLAPIKEY: apiKey
    }
  })

  return result
}

export async function getThirdPartyCategories(type) {
  const result = await axios.get(
    `${'https://qnerp.com/erp/api/index.php/categories?sortfield=t.rowid&sortorder=ASC&limit=100'}`,
    {
      params: {
        DOLAPIKEY: apiKey,
        // type: type,
        include_childs: true
      }
    }
  )

  return result
}

export async function getThirdPartyInvoices(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/thirdparties/${id}/outstandinginvoices?mode=customer`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}


export async function getThirdPartyPurposals(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/thirdparties/${id}/outstandingproposals?mode=customer`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}

export async function getThirdPartySales(id) {

  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/orders?sortfield=t.rowid&sortorder=ASC&limit=100&thirdparty_ids=${id}`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}

export async function getThirdPartyInterventions(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/interventions?sortfield=t.rowid&sortorder=ASC&limit=100&thirdparty_ids=${id}`,
    {
      params: {
        DOLAPIKEY: apiKey
      }
    }
  )

  return result
}

export async function getThirdPartyContracts(id) {

  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/contracts?sortfield=t.rowid&sortorder=ASC&limit=100&thirdparty_ids=${id}`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}

export async function getThirdPartyShipments(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/shipments?sortfield=t.rowid&sortorder=ASC&limit=100&thirdparty_ids=${id}`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}

export async function getThirdPartyRepresentatives(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/thirdparties/${id}/representatives?mode=0`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}


export async function getThirdPartyBankAccounts(id) {
  const result = await axios.get(
    `https://qnerp.com/erp/api/index.php/thirdparties/${id}/bankaccounts`,
    {
      params: {
        DOLAPIKEY: apiKey
        // type: type
      }
    }
  )

  return result
}