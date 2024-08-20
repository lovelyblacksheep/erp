// MUI Imports
import ADD_BOM from '@/views/pages/mrp/form/add_bom'
import AddCategoryForm from '@/views/pages/third-parties/categories/add_category'
import Grid from '@mui/material/Grid'

// Component Imports
import Typography from '@mui/material/Typography'

const MRP_BOM_ADD = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary text-3xl' /> Create tag/category
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddCategoryForm ctType={'2'} />
      </Grid>
    </Grid>
  )
}

export default MRP_BOM_ADD
