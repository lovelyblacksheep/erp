'use client'

import { useState } from 'react'
import BOMTable from '@/views/pages/mrp/list/bom_table'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const MRP_BOM_List = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [action, setAction] = useState('')

  const handleSelectionChange = rows => {
    setSelectedRows(rows)
  }

  const handleActionChange = event => {
    setAction(event.target.value)
  }

  const handleConfirm = async () => {
    if (action === 'delete' && selectedRows.length > 0) {
      try {
        for (const row of selectedRows) {
          await fetch(`https://qnerp.com/erp/api/index.php/boms/${row.id}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              DOLAPIKEY: 'cDIoWFiQIAB0'
            }
          })
        }
        alert('Selected items deleted successfully')
        // Perform a full page reload
        window.location.reload()
      } catch (error) {
        console.error('Error deleting items:', error)
        alert('An error occurred while deleting items')
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Bills of material - BOM
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='flex-end' alignItems='center' mb={2}>
          {selectedRows.length > 0 && (
            <>
              <Select value={action} onChange={handleActionChange} displayEmpty sx={{ minWidth: 120, mr: 2 }}>
                <MenuItem value='' disabled>
                  Select Action
                </MenuItem>
                <MenuItem value='delete'>Delete</MenuItem>
              </Select>
              <Button variant='contained' color='primary' onClick={handleConfirm} disabled={!action}>
                Confirm
              </Button>
            </>
          )}
        </Box>
        <BOMTable onSelectionChange={handleSelectionChange} />
      </Grid>
    </Grid>
  )
}

export default MRP_BOM_List
