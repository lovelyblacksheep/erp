// MUI Imports
import ADD_MO from '@/views/pages/mrp/form/add_mo'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_MO_ADD = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' />
          New Mo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ADD_MO />
      </Grid>
    </Grid>
  )
}

export default MRP_MO_ADD
