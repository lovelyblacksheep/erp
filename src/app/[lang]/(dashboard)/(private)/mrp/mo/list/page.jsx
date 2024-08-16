// MUI Imports
import MOTable from '@/views/pages/mrp/list/mo_table'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_MO_List = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Manufacturing Orders
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MOTable />
      </Grid>
    </Grid>
  )
}

export default MRP_MO_List
