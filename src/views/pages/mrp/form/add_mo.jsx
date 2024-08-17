'use client'

//Next Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

// MUI Imports
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import { addMo } from '@/libs/api/mo'

const AddMOForm = () => {
  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [boms, setBoms] = useState([])
  const [thirdParties, setThirdParties] = useState([])
  const [projects, setProjects] = useState([])

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
    date_start: null,
    time_start: null,
    date_end: null,
    time_end: null
  })

  useEffect(() => {
    fetchProducts()
    fetchWarehouses()
    fetchBoms()
    fetchThirdParties()
    fetchProjects()
  }, [])

  const fetchProducts = async () => {
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

  const fetchWarehouses = async () => {
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

  const fetchBoms = async () => {
    try {
      const response = await axios.get(`${apiUrl}/boms`, {
        params: {
          sortfield: 't.rowid',
          sortorder: 'ASC',
          limit: 100,
          page: 0,
          DOLAPIKEY: apiKey
        }
      })
      setBoms(response.data)
    } catch (error) {
      console.error('Error fetching BOMs:', error)
    }
  }

  const fetchThirdParties = async () => {
    try {
      const response = await axios.get(`${apiUrl}/thirdparties`, {
        params: {
          sortfield: 't.rowid',
          sortorder: 'ASC',
          limit: 100,
          page: 0,
          DOLAPIKEY: apiKey
        }
      })
      setThirdParties(response.data)
    } catch (error) {
      console.error('Error fetching third parties:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects`, {
        params: {
          sortfield: 't.rowid',
          sortorder: 'ASC',
          limit: 100,
          DOLAPIKEY: apiKey
        }
      })
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const dateStartUnix = dayjs(formData.date_start)
        .hour(formData.time_start ? formData.time_start.hour() : 0)
        .minute(formData.time_start ? formData.time_start.minute() : 0)
        .unix()
      const dateEndUnix = dayjs(formData.date_end)
        .hour(formData.time_end ? formData.time_end.hour() : 0)
        .minute(formData.time_end ? formData.time_end.minute() : 0)
        .unix()

      const submissionData = {
        ...formData,
        date_start: dateStartUnix,
        date_end: dateEndUnix
      }

      const result = await addMo(submissionData)

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
          date_start: null,
          time_start: null,
          date_end: null,
          time_end: null
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                      label='BOM'
                      value={formData.bom}
                      onChange={e => setFormData({ ...formData, bom: e.target.value })}
                    >
                      {boms.map(bom => (
                        <MenuItem key={bom.id} value={bom.id}>
                          {`${bom.ref} - ${bom.label}`}
                        </MenuItem>
                      ))}
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
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  Product
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                      label='Product'
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                    >
                      {products.map(product => (
                        <MenuItem key={product.id} value={product.id}>
                          {`${product.ref} - ${product.label} - ${product.barcode}`}
                        </MenuItem>
                      ))}
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
                    <InputLabel>Third-party</InputLabel>
                    <Select
                      label='Third-party'
                      value={formData.third_party}
                      onChange={e => setFormData({ ...formData, third_party: e.target.value })}
                    >
                      {thirdParties.map(party => (
                        <MenuItem key={party.id} value={party.id}>
                          {`${party.name} - ${party.name_alias}`}
                        </MenuItem>
                      ))}
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
                    <InputLabel>Project</InputLabel>
                    <Select
                      label='Project'
                      value={formData.project}
                      onChange={e => setFormData({ ...formData, project: e.target.value })}
                    >
                      {projects.map(project => (
                        <MenuItem key={project.id} value={project.id}>
                          {`${project.ref} - ${project.title}`}
                        </MenuItem>
                      ))}
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
                      label='Warehouse'
                      value={formData.warehouse}
                      onChange={e => setFormData({ ...formData, warehouse: e.target.value })}
                    >
                      {warehouses.map(warehouse => (
                        <MenuItem key={warehouse.id} value={warehouse.id}>
                          {`${warehouse.ref} - ${warehouse.lieu}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  Date start planned
                </Grid>
                <Grid item xs={12} sm={3}>
                  <DatePicker
                    label='Start Date'
                    value={formData.date_start}
                    onChange={newValue => setFormData({ ...formData, date_start: newValue })}
                    renderInput={params => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TimePicker
                    label='Start Time'
                    value={formData.time_start}
                    onChange={newValue => setFormData({ ...formData, time_start: newValue })}
                    renderInput={params => <TextField {...params} />}
                    ampm={false}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  Date end planned
                </Grid>
                <Grid item xs={12} sm={3}>
                  <DatePicker
                    label='End Date'
                    value={formData.date_end}
                    onChange={newValue => setFormData({ ...formData, date_end: newValue })}
                    renderInput={params => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TimePicker
                    label='End Time'
                    value={formData.time_end}
                    onChange={newValue => setFormData({ ...formData, time_end: newValue })}
                    renderInput={params => <TextField {...params} />}
                    ampm={false}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  Description
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label='Description'
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
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
    </LocalizationProvider>
  )
}

export default AddMOForm
