// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import AddThirdPartyForm from '@/views/pages/third-parties/add'

const AddThirdParty = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> New Third Party (prospect, customer, vendor)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddThirdPartyForm />
      </Grid>
    </Grid>
  )
}

export default AddThirdParty
