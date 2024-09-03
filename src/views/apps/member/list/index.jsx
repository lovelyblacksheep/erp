"use client";

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import MemberListTable from './MemberListTable'
import MemberListCards from './MemberListCards'
import { useEffect, useState } from 'react'

const MemberList = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MemberListCards />
      </Grid>
      <Grid item xs={12}>
        <MemberListTable tableData={data} />
      </Grid>
    </Grid>
  )
}

export default MemberList
