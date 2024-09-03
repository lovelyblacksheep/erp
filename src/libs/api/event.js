import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

const url = `${apiUrl}/agendaevents`

export async function getEvents() {
    const result = await axios.get(
        url,
        {
          params: {
            DOLAPIKEY: apiKey,
            sortfield: 't.id',
            sortorder: 'DESC',
            limit: 100
          }
        }
      )
    
      return result
}

export async function getEventsForThirdParty(id) {
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