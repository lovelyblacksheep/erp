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
import { addCategory } from '@/libs/api/category'
import { getThirdPartyCategories } from '@/libs/api/third-parties'

const AddCategoryForm = ({ctType = '1'  /* customer */}) => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [warehouses, setWarehouses] = useState([])

  const [lastBom, setLastBom] = useState(null);

  const [formData, setFormData] = useState({
    label: '',
    description: '',
    fk_parent: '',
    type: ctType,
    color: ''
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


  // Fetch Products for Dropdown
  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await getThirdPartyCategories();
        setAllCategories(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchAllCategories()
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
      const result = await addCategory({ 
          ...formData,
          label: formData.label
        })
      if (result.success) {
        setFormData({
            label: '',
            description: '',
            fk_parent: '',
            type: ctType,
            color: ''
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
                  value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
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
                  options={allCategories}
                  getOptionLabel={option => `${option.ref} - ${option.label} - ${option.barcode}`}
                  renderInput={params => <TextField {...params} label='Category' />}
                  value={allCategories.find(p => p.id === formData.fk_parent) || null}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, fk_parent: newValue ? newValue.id : '' })
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
