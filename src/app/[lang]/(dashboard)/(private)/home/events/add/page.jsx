// MUI Imports
import ADD_EVENT from '@/views/pages/home/form/add_event'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_BOM_EVENT_ADD = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Create an event
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ADD_EVENT />
      </Grid>
    </Grid>
  )
}

export default MRP_BOM_EVENT_ADD
