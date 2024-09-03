// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const TableFilters = ({ setData, tableData, typeObject }) => {
  // States
  const [type, setType] = useState('')
  const [plan, setPlan] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {

      if (type) {
        if (typeObject[type] && typeObject[type].includes(user.id)) {
          return true;
        }
        else {
          return false;
        }
      }

      if (status !== '') {
        if (`${status}` === user.status) {
          return true;
        }
        else {
          return false;
        }
      }

      return true
    })

    setData(filteredData || [])
  }, [type, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='type-select'>Select Type</InputLabel>
            <Select
              fullWidth
              id='select-type'
              value={type}
              onChange={e => setType(e.target.value)}
              label='Select Type'
              labelId='type-select'
              inputProps={{ placeholder: 'Select Type' }}
            >
              <MenuItem value=''>Select Type</MenuItem>
              <MenuItem value='prospect'>Prospect</MenuItem>
              <MenuItem value='customer'>Customer</MenuItem>
              <MenuItem value='fournisseur'>Supplier</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='plan-select'>Select Plan</InputLabel>
            <Select
              fullWidth
              id='select-plan'
              value={plan}
              onChange={e => setPlan(e.target.value)}
              label='Select Plan'
              labelId='plan-select'
              inputProps={{ placeholder: 'Select Plan' }}
            >
              <MenuItem value=''>Select Plan</MenuItem>
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='company'>Company</MenuItem>
              <MenuItem value='enterprise'>Enterprise</MenuItem>
              <MenuItem value='team'>Team</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='status-select'>Select Status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              label='Select Status'
              value={status}
              onChange={e => setStatus(e.target.value)}
              labelId='status-select'
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value=''>Select Status</MenuItem>
              <MenuItem value='0'>Pending</MenuItem>
              <MenuItem value='1'>Active</MenuItem>
              <MenuItem value='9'>Disabled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
