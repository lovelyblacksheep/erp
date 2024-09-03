"use client";

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import MemberListTable from './MemberListTable'
import MemberListCards from './MemberListCards'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { apiKey, apiUrl } from '@/config';

const MemberList = ({}) => {

  const [series, setSeries] = useState([0, 0]) // Initial series state
  const [type, setTypes] = useState({
    "bom": [],
    "mo": []
  });
  const [data, setData] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const [bom, mo] = await Promise.all([
          axios.get(`${apiUrl}/bom`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 1, // Customers
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/mos`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 2, // Prospects
              DOLAPIKEY: apiKey
            }
          })
        ])

        // let customers_ids = customers.data.map((c) => c.id);
        // let prospects_ids = prospects.data.map((c) => c.id);
        // let others_ids = others.data.map((c) => c.id);
        // let suppliers_ids = suppliers.data.map((c) => c.id);

        setTypes({
          // customer: customers_ids,
          // prospect: prospects_ids,
          // other: others_ids,
          // supplier: suppliers_ids
        });

        setSeries([bom.data.length, mo.data.length])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []);

  async function fetchData(pageSize, pageIndex) {
    try {
      const result = await getThirdParties({ limit: pageSize, page: pageIndex })
      console.log("R :: ", result)
      setData(result.data)
      console.log("result :: ", result.data)
    } catch (error) {
      console.log("ER : ", error)
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(".ERP ok :: ", data)
  }, [data]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MemberListCards series={series} />
      </Grid>
      <Grid item xs={12}>
        <MemberListTable tableData={data} />
      </Grid>
    </Grid>
  )
}

export default MemberList
