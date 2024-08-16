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
import { addBom, getBoms } from '@/libs/api/bom'

const AddBOMForm = () => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [formData, setFormData] = useState({
    label: '',
    type: '',
    product: '',
    quantity: '',
    description: '',
    est_time: '',
    warehouse: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBoms({ limit: 12, page: 0 })

        setParentCompanies(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      const result = await addBom(formData)

      if (result.success) {
        setFormData({
          label: '',
          type: '',
          product: '',
          quantity: '',
          description: '',
          est_time: '',
          warehouse: ''
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
                Type
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
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
                Quantity
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
              <Grid item xs={12} md={3}>
                Description
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  rows={4}
                  multiline
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Estimated duration
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  // label='Zip Code'
                  value={formData.est_time}
                  onChange={e => setFormData({ ...formData, est_time: e.target.value })}
                />
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
          </div>

          <Button onClick={handleSubmit} type='button' variant='contained' className='mt-5 ml-auto block'>
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddBOMForm
