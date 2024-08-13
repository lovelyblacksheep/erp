// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import Statistics from '@/views/pages/third-parties/Statistics'
import LatestThirdParties from '@/views/pages/third-parties/LatestThirdParties'
import LatestContacts from '@/views/pages/third-parties/LatestContacts'

const ThirdParties = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Third Parties/Contacts
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Statistics />
      </Grid>
      <Grid item xs={12} md={6}>
        <LatestThirdParties />
        <div className='mt-5'>
          <LatestContacts />
        </div>
      </Grid>
    </Grid>
  )
}

export default ThirdParties
