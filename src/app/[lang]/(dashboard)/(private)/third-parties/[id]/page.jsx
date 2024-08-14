// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import ThirdPartyDetail from '@/views/pages/third-parties/detail'

const ThirdParty = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Third-party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ThirdPartyDetail />
      </Grid>
    </Grid>
  )
}

export default ThirdParty
