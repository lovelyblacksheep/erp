'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { addMo, getMos } from '@/libs/api/mo'

const AddMOForm = () => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [formData, setFormData] = useState({
    bom: '',
    type: '',
    product: '',
    quantity: '',
    label: '',
    third_party: '',
    project: '',
    warehouse: '',
    description: '',
    date_start: '',
    date_end: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getMos({ limit: 12, page: 0 })

        setParentCompanies(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      const result = await addMo(formData)

      if (result.success) {
        setFormData({
          bom: '',
          type: '',
          product: '',
          quantity: '',
          label: '',
          third_party: '',
          project: '',
          warehouse: '',
          description: '',
          date_start: '',
          date_end: ''
        })

        alert('Form Submitted successfully')
      } else {
        alert('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Card>
        <CardContent>
          <div className='grid gap-5'>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Bill of Materials
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>BOM</InputLabel>
                  <Select
                    label='type'
                    value={formData.bom}
                    onChange={e => setFormData({ ...formData, bom: e.target.value })}
                  >
                    {/* <MenuItem value='2'>Prospect</MenuItem>
                    <MenuItem value='3'>Prospect / Customer</MenuItem>
                    <MenuItem value='1'>Customer</MenuItem> */}
                    <MenuItem value='0' selected>
                      Manufacturing
                    </MenuItem>
                    <MenuItem value='1'>Disassemble</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Type
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel></InputLabel>
                  <Select
                    label='type'
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    {/* <MenuItem value='2'>Prospect</MenuItem>
                    <MenuItem value='3'>Prospect / Customer</MenuItem>
                    <MenuItem value='1'>Customer</MenuItem> */}
                    <MenuItem value='0' selected>
                      Manufacturing
                    </MenuItem>
                    <MenuItem value='1'>Disassemble</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Product
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    label='product'
                    value={formData.product}
                    onChange={e => setFormData({ ...formData, product: e.target.value })}
                  >
                    {/* <MenuItem value='0'>Closed</MenuItem> */}
                    <MenuItem value='1' selected>
                      Open
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Qty to produce
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Quantity'
                  value={formData.quantity}
                  onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Label
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Label'
                  value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Third-party
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    label='Third-party'
                    value={formData.third_party}
                    onChange={e => setFormData({ ...formData, third_party: e.target.value })}
                  >
                    {/* <MenuItem value='0'>Closed</MenuItem> */}
                    <MenuItem value='1' selected>
                      Open
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Project
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    label='project'
                    value={formData.project}
                    onChange={e => setFormData({ ...formData, project: e.target.value })}
                  >
                    {/* <MenuItem value='0'>Closed</MenuItem> */}
                    <MenuItem value='1' selected>
                      Open
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Warehouse for production
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Warehouse</InputLabel>
                  <Select
                    label='product'
                    value={formData.warehouse}
                    onChange={e => setFormData({ ...formData, warehouse: e.target.value })}
                  >
                    {/* <MenuItem value='0'>Closed</MenuItem> */}
                    <MenuItem value='1'>Open</MenuItem>
                    <MenuItem value='0'>Open</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Date start planned
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  // label='Zip Code'
                  value={formData.date_start}
                  onChange={e => setFormData({ ...formData, date_start: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Date end planned
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  // label='Zip Code'
                  value={formData.est_time}
                  onChange={e => setFormData({ ...formData, date_start: e.target.value })}
                />
              </Grid>
            </Grid>
          </div>

          <Button onClick={handleSubmit} type='button' variant='contained' className='mt-5 ml-auto block'>
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddMOForm
