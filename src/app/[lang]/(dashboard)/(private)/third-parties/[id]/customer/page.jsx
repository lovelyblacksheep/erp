'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Tabs, Tab, Grid, Typography, TextField, Box } from '@mui/material'
import { styled } from '@mui/system'

import {
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
import { getBom } from '@/libs/api/bom'
import { getThirdParty } from '@/libs/api/third-parties'
import CardStatVertical from '@/components/card-statistics/Vertical'

import { AddCircleOutline, Visibility } from '@mui/icons-material';

function ProposalTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SalesTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ShipmentsTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ContractsTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function InterventionTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function InvoicesTable() {
  const rows = [
    { typeIcon: 'chart-icon', ref: 'PROV4744', date: '08/16/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PROV4725', date: '08/09/2024', amount: '0.00', status: 'Draft' },
    { typeIcon: 'chart-icon', ref: 'PR2408-0604', date: '08/08/2024', amount: '20,000.00', status: 'Draft' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton>
                  {/* Replace 'chart-icon' with an actual icon */}
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell>
                <a href={`#/${row.ref}`} style={{ color: 'blue' }}>
                  {`(${row.ref})`}
                </a>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant="outlined" style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TP_ItemTabCustomer = () => {
  const [bomData, setBomData] = useState(null)
  const [warehouseData, setWarehouseData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id: bomId } = useParams()

  useEffect(() => {
    const fetchBomData = async () => {
      setIsLoading(true)
      try {
        const response = await getThirdParty(bomId)
        if (response.status !== 200) {
          throw new Error('Failed to fetch BOM data')
        }
        const data = response.data
        setBomData(data)

        if (data.warehouse_id) {
          const warehouseResponse = await fetch(`${apiUrl}/warehouses/${data.warehouse_id}`, {
            headers: {
              DOLAPIKEY: apiKey
            }
          })
          if (!warehouseResponse.ok) {
            throw new Error('Failed to fetch warehouse data')
          }
          const warehouseData = await warehouseResponse.json()
          setWarehouseData(warehouseData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (bomId) {
      fetchBomData()
    }
  }, [bomId])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color='error'>Error: {error}</Typography>
  }

  if (!bomData) {
    return <Typography>No BOM data available</Typography>
  }

  const productLines = bomData.lines ? bomData.lines.filter(line => line.type === 'product') : []
  const serviceLines = bomData.lines ? bomData.lines.filter(line => line.type === 'service') : []

  return (
    <>
      <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
        <Box p={6} border={1} borderColor='grey.300' borderRadius={1}>
          {/* Top Section */}
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
                  // borderRadius="50%"
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  overflow='hidden'
                >
                  {/* Image Placeholder */}
                  {/* <Typography variant="body1" color="textSecondary">
                  No Image
                </Typography> */}
                  <img width={64} height={64} src='https://f.start.me/us.gov' />
                </Box>
                <Typography variant='h6' component='div'>
                  {bomData.ref || 'No Reference'}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Link href='/mrp/bom/list' passHref>
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
              <Box mb={2}>
                <Typography variant='subtitle2'>Label</Typography>
                <Typography variant='body2'>{bomData.label}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Type</Typography>
                <Typography variant='body2'>{bomData.bomtype}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Product</Typography>
                <Link href={`/products/${bomData.fk_product}`} passHref>
                  <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                    {bomData.product_ref}
                  </Typography>
                </Link>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Quantity</Typography>
                <Typography variant='body2'>{bomData.qty}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Description</Typography>
                <Typography variant='body2'>{bomData.description || '-'}</Typography>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant='subtitle2'>Estimated duration</Typography>
                <Typography variant='body2'>
                  {bomData.duration
                    ? (() => {
                        const totalMinutes = Math.floor(Number(bomData.duration) / 60)
                        const hours = Math.floor(totalMinutes / 60)
                        const minutes = totalMinutes % 60
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                      })()
                    : '-'}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Warehouse for production</Typography>
                {warehouseData && (
                  <Link href={`/warehouses/${bomData.warehouse_id}`} passHref>
                    <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                      {warehouseData.ref}
                    </Typography>
                  </Link>
                )}
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Total cost</Typography>
                <Typography variant='body2'>{bomData.total_cost}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Unit cost</Typography>
                <Typography variant='body2'>{bomData.unit_cost}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Grid container spacing={6}>
          <Grid item xs={12} sm={3} md={2}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Purposals'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Purposals'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Orders'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Invoices'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <CardStatVertical
              stats='21,804.83 €'
              title='C. Outstanding'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={'space-between'} flexDirection={'row'} columnGap={2} rowGap={6}>
          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} columnGap={4} alignItems={'center'}>
                <Typography>Latest 3 Proposals</Typography>
                <Button>All proposals</Button>
              </Grid>
            </Box>
            <ProposalTable />
          </Box>
          
          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} columnGap={4} alignItems={'center'}>
                <Typography>Latest 3 sales orders</Typography>
                <Button>All orders</Button>
              </Grid>
            </Box>
            <SalesTable />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} columnGap={4} alignItems={'center'}>
                <Typography>Latest shipments</Typography>
                <Button>All shipments</Button>
              </Grid>
            </Box>
            <ShipmentsTable />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} columnGap={4} alignItems={'center'}>
                <Typography>Latest interventions</Typography>
                <Button>All interventions</Button>
              </Grid>
            </Box>
            <InterventionTable />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} columnGap={4} alignItems={'center'}>
                <Typography>Latest 3 customer invoices</Typography>
                <Button>All invoices</Button>
              </Grid>
            </Box>
            <InvoicesTable />
          </Box>

        </Grid>


        <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
        <Button variant='contained' color='primary'>
            Create proposal
          </Button>
          <Button variant='contained' color='primary'>
            Create order
          </Button>
          <Button variant='contained' color='primary'>
            Create contract
          </Button>
          <Button variant='contained' color='primary'>
            Create intervention
          </Button>
          <Button variant='contained' color='primary'>
            Bill orders
          </Button>
        </Grid>


        <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
          <Button variant='contained' color='primary'>
            Create Invoice or Credit Note
          </Button>
        </Grid>

      </Grid>
    </>
  )
}

export default TP_ItemTabCustomer
