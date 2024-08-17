'use client'

// Next Imports
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'
import { addBom, getBoms } from '@/libs/api/bom'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material'

const AddBOMForm = () => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])

  const [formData, setFormData] = useState({
    label: '',
    type: '',
    product: '',
    quantity: '',
    description: '',
    est_time_hours: 0,
    est_time_minutes: 0,
    warehouse: ''
  })

  // Fetch Parent Companies
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

  // Fetch Products for Dropdown
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${apiUrl}/products`, {
          params: {
            sortfield: 't.ref',
            sortorder: 'ASC',
            limit: 100,
            mode: 1,
            DOLAPIKEY: apiKey
          }
        })
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  // Fetch Warehouses for Dropdown
  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const response = await axios.get(`${apiUrl}/warehouses`, {
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
            DOLAPIKEY: apiKey
          }
        })
        setWarehouses(response.data)
      } catch (error) {
        console.error('Error fetching warehouses:', error)
      }
    }
    fetchWarehouses()
  }, [])

  const handleSubmit = async () => {
    try {
      const estTimeFormatted = `${formData.est_time_hours}:${formData.est_time_minutes.toString().padStart(2, '0')}`
      const result = await addBom({ ...formData, est_time: estTimeFormatted })
      if (result.success) {
        setFormData({
          label: '',
          type: '',
          product: '',
          quantity: '',
          description: '',
          est_time_hours: 0,
          est_time_minutes: 0,
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
                    <MenuItem value='0'>Manufacturing</MenuItem>
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
                <Autocomplete
                  options={products}
                  getOptionLabel={option => `${option.ref} - ${option.label} - ${option.barcode}`}
                  renderInput={params => <TextField {...params} label='Product' />}
                  value={products.find(p => p.id === formData.product) || null}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, product: newValue ? newValue.id : '' })
                  }}
                />
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
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Hours'
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  value={formData.est_time_hours}
                  onChange={e => setFormData({ ...formData, est_time_hours: parseInt(e.target.value) || 0 })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label='Minutes'
                  type='number'
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                  value={formData.est_time_minutes}
                  onChange={e => setFormData({ ...formData, est_time_minutes: parseInt(e.target.value) || 0 })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Warehouse for production
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={warehouses}
                  getOptionLabel={option => `${option.ref} - ${option.lieu}`}
                  renderInput={params => <TextField {...params} label='Warehouse' />}
                  value={warehouses.find(w => w.id === formData.warehouse) || null}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, warehouse: newValue ? newValue.id : '' })
                  }}
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

export default AddBOMForm
