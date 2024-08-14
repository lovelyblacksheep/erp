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
import { addThirdParty, getThirdParties } from '@/libs/api/third-parties'

const AddThirdPartyForm = () => {
  const [parentCompanies, setParentCompanies] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    name_alias: '',
    client: '',
    customer_code: `CU${new Date().toISOString().slice(2, 7)}-00000`,
    fournisseur: '',
    supplier_code: `SU${new Date().toISOString().slice(2, 7)}-00000`,
    status: '1',
    barcode: '',
    address: '',
    zipcode: '',
    town: '',
    country_id: '26',
    state_id: '',
    phone: '',
    fax: '',
    email: '',
    url: '',
    no_email: '0',

    facebook: '',
    instagram: '',
    linkedin: '',
    snapchat: '',
    skype: '',
    twitter: '',
    whatsapp: '',
    youtube: '',

    idprof1: '',
    idprof2: '',
    idprof3: '',
    idprof4: '',
    idprof5: '',
    idprof6: '',

    assujtva_value: '1',
    tva_intra: '',
    typent_id: '',
    effectif_id: '',
    forme_juridique_code: '',
    capital: '',
    default_lang: '',
    incoterm_id: '',
    location_incoterms: '',
    custcats: [],
    suppcats: [],
    multicurrency_code: '',
    parent_company_id: '',
    commercial: [],
    photo: null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getThirdParties({ limit: 12, page: 0 })

        setParentCompanies(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      const result = await addThirdParty(formData)

      if (result.success) {
        setFormData({
          name: '',
          name_alias: '',
          client: '',
          customer_code: `CU${new Date().toISOString().slice(2, 7)}-00000`,
          fournisseur: '',
          supplier_code: `SU${new Date().toISOString().slice(2, 7)}-00000`,
          status: '1',
          barcode: '',
          address: '',
          zipcode: '',
          town: '',
          country_id: '26',
          state_id: '',
          phone: '',
          fax: '',
          email: '',
          url: '',
          no_email: '0',

          facebook: '',
          instagram: '',
          linkedin: '',
          snapchat: '',
          skype: '',
          twitter: '',
          whatsapp: '',
          youtube: '',

          idprof1: '',
          idprof2: '',
          idprof3: '',
          idprof4: '',
          idprof5: '',
          idprof6: '',

          assujtva_value: '1',
          tva_intra: '',
          typent_id: '',
          effectif_id: '',
          forme_juridique_code: '',
          capital: '',
          default_lang: '',
          incoterm_id: '',
          location_incoterms: '',
          custcats: [],
          suppcats: [],
          multicurrency_code: '',
          parent_company_id: '',
          commercial: [],
          photo: null
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
              <Grid item xs={12} sm={9}>
                <TextField
                  fullWidth
                  label='Third-party name'
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={9}>
                <TextField
                  fullWidth
                  label='Alias name (commercial, trademark, ...)'
                  value={formData.name_alias}
                  onChange={e => setFormData({ ...formData, name_alias: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Prospect / Customer</InputLabel>
                  <Select
                    label='Prospect / Customer'
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                  >
                    {/* <MenuItem value='2'>Prospect</MenuItem>
                    <MenuItem value='3'>Prospect / Customer</MenuItem>
                    <MenuItem value='1'>Customer</MenuItem> */}
                    <MenuItem value='0'>Not prospect, nor customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Customer Code'
                  value={formData.customer_code}
                  onChange={e => setFormData({ ...formData, customer_code: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Vendor</InputLabel>
                  <Select
                    label='Vendor'
                    value={formData.fournisseur}
                    onChange={e => setFormData({ ...formData, fournisseur: e.target.value })}
                  >
                    <MenuItem value='0'>Closed</MenuItem>
                    <MenuItem value='1'>Open</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Vendor Code'
                  value={formData.supplier_code}
                  onChange={e => setFormData({ ...formData, supplier_code: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label='Status'
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value='0'>Closed</MenuItem>
                    <MenuItem value='1' selected>
                      Open
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  label='Barcode'
                  value={formData.barcode}
                  onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={11}>
                <TextField
                  fullWidth
                  rows={4}
                  multiline
                  label='Address'
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Zip Code'
                  value={formData.zipcode}
                  onChange={e => setFormData({ ...formData, zipcode: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='City'
                  value={formData.town}
                  onChange={e => setFormData({ ...formData, town: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={11}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    label='Country'
                    value={formData.country_id}
                    onChange={e => setFormData({ ...formData, country_id: e.target.value })}
                  >
                    <MenuItem value='85'> Egypt (EG)</MenuItem>
                    <MenuItem value='130'> Kuwait (KW)</MenuItem>
                    <MenuItem value='26'>Saudi Arabia (SA)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={7}>
                <FormControl fullWidth>
                  <InputLabel>State/Province</InputLabel>
                  <Select
                    label='State/Province'
                    value={formData.state_id}
                    onChange={e => setFormData({ ...formData, state_id: e.target.value })}
                  >
                    <MenuItem value='0'></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone'
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Fax'
                  value={formData.fax}
                  onChange={e => setFormData({ ...formData, fax: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Email'
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={11}>
                <TextField
                  fullWidth
                  label='Web'
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Refuse bulk emailings</InputLabel>
                  <Select
                    label='Refuse bulk emailings'
                    value={formData.no_email}
                    onChange={e => setFormData({ ...formData, no_email: e.target.value })}
                  >
                    <MenuItem value='1'>Yes</MenuItem>
                    <MenuItem value='0'>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider />

            {/* Social */}
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Facebook'
                  value={formData.facebook}
                  onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Instagram'
                  value={formData.instagram}
                  onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Linkedin'
                  value={formData.linkedin}
                  onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Snapchat'
                  value={formData.snapchat}
                  onChange={e => setFormData({ ...formData, snapchat: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Skype'
                  value={formData.skype}
                  onChange={e => setFormData({ ...formData, skype: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Twitter'
                  value={formData.twitter}
                  onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Whatsapp'
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Youtube'
                  value={formData.youtube}
                  onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                />
              </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 1'
                  value={formData.idprof1}
                  onChange={e => setFormData({ ...formData, idprof1: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 2'
                  value={formData.idprof2}
                  onChange={e => setFormData({ ...formData, idprof2: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 3'
                  value={formData.idprof3}
                  onChange={e => setFormData({ ...formData, idprof3: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 4'
                  value={formData.idprof4}
                  onChange={e => setFormData({ ...formData, idprof4: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 5'
                  value={formData.idprof5}
                  onChange={e => setFormData({ ...formData, idprof5: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Professional ID 6'
                  value={formData.idprof6}
                  onChange={e => setFormData({ ...formData, idprof6: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} className='flex items-center gap-3'>
                <InputLabel>Sales tax used</InputLabel>
                <Checkbox
                  checked={formData.assujtva_value == 1}
                  onChange={e => setFormData({ ...formData, assujtva_value: e.target.checked })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='VAT ID'
                  value={formData.tva_intra}
                  onChange={e => setFormData({ ...formData, tva_intra: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Third-party type</InputLabel>
                  <Select
                    label='Third-party type'
                    value={formData.typent_id}
                    onChange={e => setFormData({ ...formData, typent_id: e.target.value })}
                  >
                    <MenuItem value='5'>Governmental</MenuItem>
                    <MenuItem value='2'>Large company</MenuItem>
                    <MenuItem value='3'>Medium company</MenuItem>
                    <MenuItem value='100'>Other</MenuItem>
                    <MenuItem value='8'>Private individual</MenuItem>
                    <MenuItem value='4'>Small company</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Workforce</InputLabel>
                  <Select
                    label='Workforce'
                    value={formData.effectif_id}
                    onChange={e => setFormData({ ...formData, effectif_id: e.target.value })}
                  >
                    <MenuItem value='1'>1 - 5</MenuItem>
                    <MenuItem value='2'>6 - 10</MenuItem>
                    <MenuItem value='3'>11 - 50</MenuItem>
                    <MenuItem value='4'>51 - 100</MenuItem>
                    <MenuItem value='5'>101 - 500</MenuItem>
                    <MenuItem value='6'>{'>'} 500</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Business entity type</InputLabel>
                  <Select
                    label='Business entity type'
                    value={formData.forme_juridique_code}
                    onChange={e => setFormData({ ...formData, forme_juridique_code: e.target.value })}
                  ></Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <div className='flex items-center gap-2'>
                  <TextField
                    label='Capital'
                    value={formData.capital}
                    onChange={e => setFormData({ ...formData, capital: e.target.value })}
                  />
                  <Typography>Saudi Arabia Riyal</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Default Language</InputLabel>
                  <Select
                    label='Default Language'
                    value={formData.default_lang}
                    onChange={e => setFormData({ ...formData, default_lang: e.target.value })}
                  ></Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <InputLabel>Incoterms</InputLabel>

                <div className='flex items-center gap-3 mt-2'>
                  <Select
                    label=''
                    value={formData.incoterm_id}
                    onChange={e => setFormData({ ...formData, incoterm_id: e.target.value })}
                    className='w-32'
                  >
                    <MenuItem value='5'>CFR</MenuItem>
                    <MenuItem value='6'>CIF</MenuItem>
                    <MenuItem value='8'>CIP</MenuItem>
                    <MenuItem value='7'>CPT</MenuItem>
                    <MenuItem value='10'>DAP</MenuItem>
                    <MenuItem value='9'>DAT</MenuItem>
                    <MenuItem value='11'>DDP</MenuItem>
                    <MenuItem value='12'>DPU</MenuItem>
                    <MenuItem value='1'>EXW</MenuItem>
                    <MenuItem value='3'>FAS</MenuItem>
                    <MenuItem value='2'>FCA</MenuItem>
                    <MenuItem value='4'>FOB</MenuItem>
                  </Select>

                  <FormControl fullWidth>
                    <TextField
                      value={formData.location_incoterms}
                      onChange={e => setFormData({ ...formData, location_incoterms: e.target.value })}
                    />
                  </FormControl>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={11}>
                <FormControl fullWidth>
                  <InputLabel>Cust./Prosp. tags/categories </InputLabel>
                  <Select
                    multiple
                    label='Cust./Prosp. tags/categories'
                    value={formData.custcats}
                    onChange={e => setFormData({ ...formData, custcats: e.target.value })}
                  ></Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={11}>
                <FormControl fullWidth>
                  <InputLabel>Vendors tags/categories</InputLabel>
                  <Select
                    multiple
                    label='Vendors tags/categories'
                    value={formData.suppcats}
                    onChange={e => setFormData({ ...formData, suppcats: e.target.value })}
                  ></Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    label='Currency'
                    value={formData.multicurrency_code}
                    onChange={e => setFormData({ ...formData, multicurrency_code: e.target.value })}
                  >
                    <MenuItem value='SAR'>Saudi Arabia Riyal (﷼)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                  <InputLabel>Parent Company</InputLabel>
                  <Select
                    label='Parent Company'
                    value={formData.parent_company_id}
                    onChange={e => setFormData({ ...formData, parent_company_id: e.target.value })}
                  >
                    {parentCompanies.map(parentCompany => (
                      <MenuItem value={parentCompany.id}>{parentCompany.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={11}>
                <FormControl fullWidth>
                  <InputLabel>Assigned to sales representative</InputLabel>
                  <Select
                    multiple
                    label='Assigned to sales representative'
                    value={formData.commercial}
                    onChange={e => setFormData({ ...formData, commercial: e.target.value })}
                  ></Select>
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

export default AddThirdPartyForm
