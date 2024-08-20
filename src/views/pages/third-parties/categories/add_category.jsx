'use client'

// Next Imports
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'
import { addBom, getBoms, getLastBom } from '@/libs/api/bom'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material'

const AddCategoryForm = () => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])

  const [lastBom, setLastBom] = useState(null);

  const [formData, setFormData] = useState({
    label: '',
    type: '',
    bomtype: '',
    status: '',
    product: '',
    fk_product: '',
    quantity: '',
    description: '',
    est_time_hours: 0,
    est_time_minutes: 0,
    warehouse: '',
    fk_warehoust: '',
    ref: '(PROV{ID})'
  })


  // Fetch Parent Companies
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBoms({ limit: 12, page: 0 })
        console.log("R :: ", result)
        setParentCompanies(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchLastBomData() {
      try {
        const result = await getLastBom({})
        console.log("R :: ", result)
        setLastBom(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLastBomData()
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
      let lastId = (lastBom || []).length > 0 ? lastBom[0].id : 0;
      const estTimeFormatted = `${formData.est_time_hours}:${formData.est_time_minutes.toString().padStart(2, '0')}`
      const result = await addBom({ 
          ...formData,
          est_time: estTimeFormatted,
          bomtype: formData.type,
          status: '0',
          fk_warehouse: formData.warehouse,
          ref: formData.ref.replace("{ID}", lastId+1),
          qty: formData.quantity
        })
      if (result.success) {
        setFormData({
          label: '',
          type: '',
          bomtype: '',
          status: '',
          product: '',
          fk_product: '',
          quantity: '',
          description: '',
          est_time_hours: 0,
          est_time_minutes: 0,
          warehouse: '',
          fk_warehouse: '',
          ref: '(PROV{ID})'
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
                Ref
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Ref'
                  value={formData.ref}
                  onChange={e => setFormData({ ...formData, ref: e.target.value })}
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
                Color
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Color'
                    type='color'
                  value={formData.color}
                  onChange={e => setFormData({ ...formData, color: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Position
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Position'
                    type='number'
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                />
              </Grid>
            </Grid>


            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                Add in
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

          </div>

          <Button onClick={handleSubmit} type='button' variant='contained' className='mt-5 ml-auto block'>
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddCategoryForm
