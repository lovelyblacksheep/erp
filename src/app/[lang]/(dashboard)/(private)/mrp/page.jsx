// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import Statistics from '@/views/pages/mrp/Statistics'
import LatestBOM from '@/views/pages/mrp/LatestBOM'
import LatestMO from '@/views/pages/mrp/LatestMO'

const MRP = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> MRP Area
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Statistics />
      </Grid>
      <Grid item xs={12} md={6}>
        <LatestBOM />
        <div className='mt-5'>
          <LatestMO />
        </div>
      </Grid>
    </Grid>
  )
}

export default MRP
