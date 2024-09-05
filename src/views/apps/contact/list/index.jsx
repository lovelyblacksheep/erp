"use client";

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ContactListTable from '@views/apps/contact/list/ContactListTable'
import ContactListCards from '@views/apps/contact/list/ContactListCards'
import { useEffect, useState } from 'react'
import { apiKey, apiUrl } from '@/config';
import { getThirdParties } from '@/libs/api/contacts';
import axios from 'axios';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

// Styles for icon and text alignment
const headingStyle = {
  display: 'flex',
  alignItems: 'center',
}



const ContactList = ({}) => {

  const theme = useTheme()

  const iconStyle = {
    fontSize: 34, // Adjust size as needed
    marginRight: 16, // Margin between icon and text
      color: theme.palette.primary.main, // Primary color for the icon
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: '2rem', // Adjust size as needed
      color: theme.palette.primary.main, // Primary color for the text
  }

  const [series, setSeries] = useState([0, 0, 0, 0]) // Initial series state
  const [type, setTypes] = useState({
    "prospect": [],
    "customer": [],
    "supplier": [],
    "other": []
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [customers, prospects, others, suppliers] = await Promise.all([
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 1, // Customers
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 2, // Prospects
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 3, // Others
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 4, // Suppliers
              DOLAPIKEY: apiKey
            }
          })
        ])

        let customers_ids = customers.data.map((c) => c.id);
        let prospects_ids = prospects.data.map((c) => c.id);
        let others_ids = others.data.map((c) => c.id);
        let suppliers_ids = suppliers.data.map((c) => c.id);

        setTypes({
          customer: customers_ids,
          prospect: prospects_ids,
          other: others_ids,
          supplier: suppliers_ids
        });

        setSeries([customers.data.length, prospects.data.length, others.data.length, suppliers.data.length])
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

  const handleFetchData = () => {
    // fetchData();
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
  <div style={headingStyle}>
    <i className="ri-contacts-line" style={iconStyle}></i>
    <Typography style={textStyle}>Contacts</Typography>
  </div>
</Grid>
      <Grid item xs={12}>
        <ContactListCards series={series} type={type} />
      </Grid>
      <Grid item xs={12}>
        <ContactListTable /*fetchData={handleFetchData}*/ type={type} />
      </Grid>
    </Grid>
  )
}

export default ContactList
