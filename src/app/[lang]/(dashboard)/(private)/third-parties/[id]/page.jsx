// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import ThirdPartyDetail from '@/views/pages/third-parties/detail'
import { getThirdParty } from '@/libs/api/third-parties'
import Files from '@/views/pages/third-parties/detail/Files'
import LatestEvents from '@/views/pages/third-parties/detail/LatestEvents'

const ThirdParty = async ({ params: { id } }) => {
  const thirdParty = await getThirdParty(id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Third-party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ThirdPartyDetail data={thirdParty} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Files />
      </Grid>

      <Grid item xs={12} lg={6}>
        <LatestEvents />
      </Grid>
    </Grid>
  )
}

export default ThirdParty
