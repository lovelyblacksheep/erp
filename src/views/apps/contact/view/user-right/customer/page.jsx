'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Tabs, Tab, Grid, Typography, TextField, Box, Card, CardContent } from '@mui/material'
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
import { getThirdParty, getThirdPartyContracts, getThirdPartyInterventions, getThirdPartyInvoices, getThirdPartyPurposals, getThirdPartySales, getThirdPartyShipments } from '@/libs/api/third-parties'
import CardStatVertical from '@/components/card-statistics/Vertical'

import { AddCircleOutline, Visibility } from '@mui/icons-material'

function ProposalTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    let p = [];
    Object.keys(data.refs || {}).map((k) => {
      p.push({
        typeIcon: 'chart-icon',
        ref: data.refs[k],
        date: null,
        amount: null,
        status: "Unknown"
      })
    });
    setRows(p);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

function SalesTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    setRows(data);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

function ShipmentsTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    setRows(data);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

function ContractsTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    setRows(data);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

function InterventionTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    setRows(data);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

function InvoicesTable({data}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(!data) {
      setRows([]);
      return;
    }
    let p = [];
    Object.keys(data.refs || {}).map((k) => {
      p.push({
        typeIcon: 'chart-icon',
        ref: data.refs[k],
        date: null,
        amount: null,
        status: "Unknown"
      })
    });
    setRows(p);
  }, [data]);


  return (
    <Card>
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
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Paper variant='outlined' style={{ padding: '4px 8px', display: 'inline-block' }}>
                  {row.status}
                </Paper>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && <TableRow><TableCell align='center'>None</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

const TP_ItemTabCustomer = () => {
  const [bomData, setBomData] = useState(null)
  const [warehouseData, setWarehouseData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id: bomId } = useParams()

  const [purposalsData, setPurposalsData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [shipmentsData, setShipmentsData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [contractsData, setContractsData] = useState([]);
  const [interventionsData, setInterventionsData] = useState([]);


  const fetchPurposalsData = async () => {
    try {
      const response = await getThirdPartyPurposals(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setPurposalsData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  const fetchSalesData = async () => {
    try {
      const response = await getThirdPartySales(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setSalesData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  const fetchInvoicesData = async () => {
    try {
      const response = await getThirdPartyInvoices(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setInvoicesData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  const fetchInterventionsData = async () => {
    try {
      const response = await getThirdPartyInterventions(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setInterventionsData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  const fetchContractsData = async () => {
    try {
      const response = await getThirdPartyContracts(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setContractsData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  const fetchShipmentsData = async () => {
    try {
      const response = await getThirdPartyShipments(bomId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = response.data
      setShipmentsData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
    }
  }

  useEffect(() => {
    fetchInvoicesData();
    fetchContractsData();
    fetchShipmentsData();
    fetchSalesData();
    fetchPurposalsData();
    fetchInterventionsData();
  }, [bomData]);

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

  return (
    <>
      <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
        {/* <Paper p={6} border={1} borderColor='grey.300' borderRadius={1}> */}
        <Card p={6} border={1} borderColor='grey.300' borderRadius={1}>
        <CardContent className='flex flex-col gap-6'>
          {/* Main Content Section */}
          <Grid container spacing={2} p={6}>
            {/* Left Column */}
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Label</Typography>
                <Typography variant='body2'>{bomData.label}</Typography>
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Type</Typography>
                <Typography variant='body2'>{bomData.bomtype}</Typography>
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Product</Typography>
                <Link href={`/products/${bomData.fk_product}`} passHref>
                  <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                    {bomData.product_ref}
                  </Typography>
                </Link>
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Quantity</Typography>
                <Typography variant='body2'>{bomData.qty}</Typography>
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Description</Typography>
                <Typography variant='body2'>{bomData.description || '-'}</Typography>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Estimated duration</Typography>
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
                <Typography color='text.primary' className='font-medium'>Warehouse for production</Typography>
                {warehouseData && (
                  <Link href={`/warehouses/${bomData.warehouse_id}`} passHref>
                    <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                      {warehouseData.ref}
                    </Typography>
                  </Link>
                )}
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Total cost</Typography>
                <Typography variant='body2'>{bomData.total_cost}</Typography>
              </Box>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Unit cost</Typography>
                <Typography variant='body2'>{bomData.unit_cost}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        </Card>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Purposals'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Orders'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatVertical
              stats='21,804.83 €'
              title='Invoices'
              avatarColor='primary'
              avatarIcon='ri-briefcase-line'
              avatarSkin='light'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest 3 Proposals</Typography>
                <Button>All proposals</Button>
              </Grid>
            </Box>
            <ProposalTable data={purposalsData} />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest 3 sales orders</Typography>
                <Button>All orders</Button>
              </Grid>
            </Box>
            <SalesTable data={salesData} />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest shipments</Typography>
                <Button>All shipments</Button>
              </Grid>
            </Box>
            <ShipmentsTable data={shipmentsData} />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest contracts</Typography>
                <Button>All contracts</Button>
              </Grid>
            </Box>
            <ContractsTable data={contractsData} />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest interventions</Typography>
                <Button>All interventions</Button>
              </Grid>
            </Box>
            <InterventionTable data={interventionsData} />
          </Box>

          <Box width={'100%'}>
            <Box width={'100%'}>
              <Grid
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                columnGap={4}
                alignItems={'center'}
              >
                <Typography>Latest 3 customer invoices</Typography>
                <Button>All invoices</Button>
              </Grid>
            </Box>
            <InvoicesTable data={invoicesData} />
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
