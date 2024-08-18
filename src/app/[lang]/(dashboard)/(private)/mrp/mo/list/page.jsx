// MUI Imports
import Link from '@/components/Link'
import MOTable from '@/views/pages/mrp/list/mo_table'
import { AddCircleOutlineSharp } from '@mui/icons-material'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_MO_List = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} width={'100%'} display={"flex"} justifyContent={"space-between"}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Manufacturing Orders
        </Typography>
        <Button variant='contained' color='primary' component={Link} href="add">
          <AddCircleOutlineSharp /><span style={{marginLeft: 4}}>Add</span>
        </Button>

      </Grid>
      <Grid item xs={12}>
        <MOTable />
      </Grid>
    </Grid>
  )
}

export default MRP_MO_List
