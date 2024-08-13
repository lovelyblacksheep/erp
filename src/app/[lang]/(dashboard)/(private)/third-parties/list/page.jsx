// MUI Imports
import ThirdPartiesTable from '@/views/pages/third-parties/list/table'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const ThirdParties = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Third-parties (4523)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ThirdPartiesTable />
      </Grid>
    </Grid>
  )
}

export default ThirdParties
