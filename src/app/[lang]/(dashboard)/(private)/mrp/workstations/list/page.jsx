// MUI Imports
import WorkstationsTable from '@/views/pages/mrp/list/workstations_table'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_Workstations_List = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Workstations
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <WorkstationsTable />
      </Grid>
    </Grid>
  )
}

export default MRP_Workstations_List
