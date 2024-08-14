// MUI Imports
import BOMTable from '@/views/pages/mrp/list/bom_table'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Bills of material - BOM
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <BOMTable />
      </Grid>
    </Grid>
  )
}

export default MRP
