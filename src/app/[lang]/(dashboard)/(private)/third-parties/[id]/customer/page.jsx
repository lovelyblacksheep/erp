// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ThirdPartyCustomerComponent from '@/views/pages/third-parties/detail/customer'

const ThirdPartyCustomer = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ThirdPartyCustomerComponent />
      </Grid>
    </Grid>
  )
}

export default ThirdPartyCustomer
