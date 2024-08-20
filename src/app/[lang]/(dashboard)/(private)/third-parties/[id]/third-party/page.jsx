'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Select,
  MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import { getThirdParty } from '@/libs/api/third-parties'

const InfoItem = ({ label, value }) => (
  <Box mb={2}>
    <Typography variant='subtitle2'>{label}</Typography>
    <Typography variant='body2'>{value || '-'}</Typography>
  </Box>
)

const TP_ItemTabThirdParty = () => {
  const [thirdPartyData, setThirdPartyData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const thirdPartyId = params.id

  useEffect(() => {
    const fetchThirdPartyData = async () => {
      setIsLoading(true)
      try {
        const response = await getThirdParty(thirdPartyId)
        if (response.status !== 200) {
          throw new Error('Failed to fetch Third Party data')
        }
        const data = response.data
        setThirdPartyData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (thirdPartyId) {
      fetchThirdPartyData()
    }
  }, [thirdPartyId])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color='error'>Error: {error}</Typography>
  }

  if (!thirdPartyData) {
    return <Typography>No Third Party data available</Typography>
  }

  return (
    <>
      <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
        <Box p={6} border={1} borderColor='grey.300' borderRadius={1}>
          {/* Top Section with Image and ID */}
          <Grid container justifyContent='space-between' alignItems='center' mb={2}>
            <Grid item>
              <Box
                mb={2}
                display={'flex'}
                justifyContent={'flex-start'}
                flexDirection={'row'}
                gap={'20px'}
                alignItems={'center'}
              >
                <Box
                  width={50}
                  height={50}
                  bgcolor='grey.200'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  overflow='hidden'
                >
                  <img width={64} height={64} src='https://f.start.me/us.gov' alt='Third Party' />
                </Box>
                <Typography variant='h6' component='div'>
                  {thirdPartyData.ref || 'No Reference'}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Link href='/third-parties/list' passHref>
                <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Back to list
                </Typography>
              </Link>
            </Grid>
          </Grid>

          {/* Main Content Section */}
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>
              <InfoItem label='Nature of Third party' value={thirdPartyData.thirdparty_nature} />
              <InfoItem label='Customer Code' value={thirdPartyData.code_client} />
              <InfoItem label='Barcode' value={thirdPartyData.barcode} />
              <InfoItem label='Prof Id 1 (TIN)' value={thirdPartyData.prof_id1} />
              <InfoItem label='Prof Id 2 (PAN)' value={thirdPartyData.prof_id2} />
              <InfoItem label='Prof Id 3 (SRVC TAX)' value={thirdPartyData.prof_id3} />
              <InfoItem label='Prof Id 4' value={thirdPartyData.prof_id4} />
              <InfoItem label='Prof Id 5' value={thirdPartyData.prof_id5} />
              <InfoItem label='VAT ID' value={thirdPartyData.vat_id} />
              <InfoItem label='Customers tags/categories' value={thirdPartyData.customer_tags} />
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <InfoItem label='Third-party type' value={thirdPartyData.thirdparty_type} />
              <InfoItem label='Workforce' value={thirdPartyData.workforce} />
              <InfoItem label='Business entity type' value={thirdPartyData.business_entity_type} />
              <InfoItem label='Refuse bulk emailings' value={thirdPartyData.refuse_bulk_emailings ? 'Yes' : 'No'} />
              <InfoItem label='Default language' value={thirdPartyData.default_language} />
              <InfoItem label='Incoterms' value={thirdPartyData.incoterms} />
              <InfoItem label='Currency' value={thirdPartyData.currency} />
              <InfoItem label='Height' value={thirdPartyData.height} />
              <InfoItem label='Weight' value={thirdPartyData.weight} />
              <InfoItem label='Profession' value={thirdPartyData.profession} />
              <InfoItem label='Birth date' value={thirdPartyData.birth_date} />
              <InfoItem label='Parent company' value={thirdPartyData.parent_company} />
              <InfoItem label='Sales representatives' value={thirdPartyData.sales_representatives} />
              <InfoItem label='Link to member' value={thirdPartyData.link_to_member} />
            </Grid>
          </Grid>
        </Box>

        <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
          <Button variant='contained' color='primary'>
            Send Email
          </Button>
          <Button variant='contained' color='primary'>
            Modify
          </Button>
          <Button variant='contained' color='primary'>
            Merge
          </Button>
          <Button variant='contained' color='error'>
            Delete
          </Button>
        </Grid>

        <Grid container justifyContent={'space-between'} flexDirection={'row'} columnGap={2} rowGap={6}>
          <Box width={'100%'}>
            <Typography variant='h5' gutterBottom>
              Linked files
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Create date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} align='center'>
                      None
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box width={'100%'} mt={2}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} columnGap={4} alignItems={'center'}>
                <Typography>Doc template</Typography>
                <Select>
                  <MenuItem>template.odt</MenuItem>
                </Select>
                <Select>
                  <MenuItem>English</MenuItem>
                </Select>
                <Button variant='contained'>Generate</Button>
              </Grid>
            </Box>
          </Box>
          <Box width={'100%'}>
            <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='h5' gutterBottom>
                Latest 10 linked events
              </Typography>
              <Grid>
                <IconButton>
                  <MenuIcon />
                </IconButton>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Ref.</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount (excl.)</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      None
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default TP_ItemTabThirdParty
