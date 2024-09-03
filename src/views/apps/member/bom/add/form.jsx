'use client'

// React Imports
import { useEffect, useState } from 'react'
import axios from 'axios'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Autocomplete from '@mui/material/Autocomplete'

// Component Imports
import { getBoms, getLastBom } from '@/libs/api/bom'
import { apiKey, apiUrl } from '@/config'

const AddTpForm = () => {

  // States
  
  const [expanded, setExpanded] = useState('panel0')

  const handleExpandChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [parentCompanies, setParentCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [lastBom, setLastBom] = useState(null)

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
    fk_warehouse: '',
    ref: '(PROV{ID})'
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

  // Fetch Last BOM Data
  useEffect(() => {
    async function fetchLastBomData() {
      try {
        const result = await getLastBom({})
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
      let lastId = (lastBom || []).length > 0 ? lastBom[0].id : 0
      const estTimeFormatted = `${formData.est_time_hours}:${formData.est_time_minutes.toString().padStart(2, '0')}`
      const result = await addBom({
        ...formData,
        est_time: estTimeFormatted,
        bomtype: formData.type,
        status: '0',
        fk_warehouse: formData.warehouse,
        ref: formData.ref.replace('{ID}', lastId + 1),
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

  const steps = [
    {
      title: 'General Info',
      content: (
        <Grid container spacing={3} p={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Label'
              value={formData.label}
              onChange={e => setFormData({ ...formData, label: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label='Type'
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value='0'>Manufacturing</MenuItem>
                <MenuItem value='1'>Disassemble</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Autocomplete
                options={products}
                getOptionLabel={option => `${option.ref} - ${option.label} - ${option.barcode}`}
                renderInput={params => <TextField {...params} label='Product' />}
                value={products.find(p => p.id === formData.product) || null}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, product: newValue ? newValue.id : '' })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Quantity'
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Description'
              multiline
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {/* <InputLabel style={{marginBottom: 12}}>Estimated Duration</InputLabel> */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label='Hours'
                    type='number'
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formData.est_time_hours}
                    onChange={e => setFormData({ ...formData, est_time_hours: parseInt(e.target.value) || 0 })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
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
            </FormControl>
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <form onSubmit={e => e.preventDefault()}>
      {steps.map((step, i) => (
        <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleExpandChange(`panel${i}`)}>
          <AccordionSummary>
            <Typography>{step.title}</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            {step.content}
          </AccordionDetails>
        </Accordion>
      ))}
      <Grid container justifyContent='center' mt={4}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </form>
  )
}

export default AddTpForm