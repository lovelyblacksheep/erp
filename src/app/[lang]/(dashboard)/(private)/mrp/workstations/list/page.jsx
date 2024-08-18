// MUI Imports
import WorkstationsTable from '@/views/pages/mrp/list/workstations_table'
import Grid from '@mui/material/Grid'
import { AddCircleOutlineSharp } from '@mui/icons-material'
import { Button } from '@mui/material'


// Component Imports
import Typography from '@mui/material/Typography'
import Link from '@/components/Link'

const MRP_Workstations_List = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
      <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Workstations
        </Typography>
        <Button variant='contained' color='primary' component={Link} href="add">
          <AddCircleOutlineSharp /><span style={{marginLeft: 4}}>Add</span>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <WorkstationsTable />
      </Grid>
    </Grid>
  )
}

export default MRP_Workstations_List
