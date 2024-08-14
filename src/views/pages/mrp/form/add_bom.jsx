// MUI Imports
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Card from '@mui/material/Card'

const TextFieldVariant = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        Label
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField fullWidth id='standard-basic' label='Standard' variant='standard' />
      </Grid>
      <Grid item xs={12} md={4}>
        Type
      </Grid>
      <Grid item xs={12} md={8}>
        <FormControl variant='standard' fullWidth className=''>
          <InputLabel id='demo-basic-select-label'>Type</InputLabel>
          <Select label='Age' labelId='demo-basic-select-label' id='demo-basic-select' defaultValue=''>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        Product
      </Grid>
      <Grid item xs={12} md={8}>
        <FormControl variant='standard' fullWidth className=''>
          <InputLabel id='demo-basic-select-label'>Product</InputLabel>
          <Select label='Age' labelId='demo-basic-select-label' id='demo-basic-select' defaultValue=''>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        Quantity
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField fullWidth id='standard-basic' label='Standard' variant='standard' />
      </Grid>
      <Grid item xs={12} md={4}>
        Description
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          rows={4}
          multiline
          label='Multiline'
          defaultValue='Default Value'
          id='textarea-outlined-static'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        Estimated duration
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField fullWidth id='standard-basic' label='Standard' variant='standard' />
      </Grid>
      <Grid item xs={12} md={4}>
        Warehouse for production
      </Grid>
      <Grid item xs={12} md={8}>
        <FormControl variant='standard' fullWidth className=''>
          <InputLabel id='demo-basic-select-label'>Warehouse for production</InputLabel>
          <Select label='Age' labelId='demo-basic-select-label' id='demo-basic-select' defaultValue=''>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default TextFieldVariant
