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
import { getThirdParty } from '@/libs/api/third-parties'

const CreditCardsOfTp = ({ data }) => {
  const [newRow, setNewRow] = useState({
    product_ref: '',
    product_label: '',
    qty: 1,
    physical_stock: '',
    virtual_stock: ''
  })

  const handleAddRow = () => {
    console.log('Adding new row:', newRow)
    setNewRow({
      product_ref: '',
      product_label: '',
      qty: 1,
      physical_stock: '',
      virtual_stock: ''
    })
  }

  return (
    <>
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
            <Typography variant='h5' component='div'>
              Credit cards
            </Typography>
          </Box>
        </Grid>
        <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Physical Stock</TableCell>
                <TableCell align='right'>Virtual Stock</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    <Link href={`/products/${row.fk_product}`} passHref>
                      <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                        {`${row.product_ref} - ${row.product_label}`}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.physical_stock}</TableCell>
                  <TableCell align='right'>{row.virtual_stock}</TableCell>
                  <TableCell align='center'>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Product'
                    value={`${newRow.product_ref} - ${newRow.product_label}`}
                    onChange={e => {
                      const [ref, label] = e.target.value.split(' - ')
                      setNewRow({ ...newRow, product_ref: ref, product_label: label })
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.qty}
                    onChange={e => setNewRow({ ...newRow, qty: Number(e.target.value) })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.physical_stock}
                    onChange={e => setNewRow({ ...newRow, physical_stock: e.target.value })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.virtual_stock}
                    onChange={e => setNewRow({ ...newRow, virtual_stock: e.target.value })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='center'>
                  <Button variant='contained' color='primary' onClick={handleAddRow} startIcon={<AddIcon />}>
                    ADD
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Card>
      </Grid>
    </>
  )
}

const BankAccountsOfTp = ({ data }) => {
  const [newRow, setNewRow] = useState({
    product_ref: '',
    product_label: '',
    qty: 1,
    physical_stock: '',
    virtual_stock: ''
  })

  const handleAddRow = () => {
    console.log('Adding new row:', newRow)
    setNewRow({
      product_ref: '',
      product_label: '',
      qty: 1,
      physical_stock: '',
      virtual_stock: ''
    })
  }

  return (
    <>
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
            <Typography variant='h5' component='div'>
              Bank accounts
            </Typography>
          </Box>
        </Grid>
        <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Physical Stock</TableCell>
                <TableCell align='right'>Virtual Stock</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    <Link href={`/products/${row.fk_product}`} passHref>
                      <Typography variant='body2' style={{ textDecoration: 'none', color: 'inherit' }}>
                        {`${row.product_ref} - ${row.product_label}`}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.physical_stock}</TableCell>
                  <TableCell align='right'>{row.virtual_stock}</TableCell>
                  <TableCell align='center'>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Product'
                    value={`${newRow.product_ref} - ${newRow.product_label}`}
                    onChange={e => {
                      const [ref, label] = e.target.value.split(' - ')
                      setNewRow({ ...newRow, product_ref: ref, product_label: label })
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.qty}
                    onChange={e => setNewRow({ ...newRow, qty: Number(e.target.value) })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.physical_stock}
                    onChange={e => setNewRow({ ...newRow, physical_stock: e.target.value })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    type='number'
                    value={newRow.virtual_stock}
                    onChange={e => setNewRow({ ...newRow, virtual_stock: e.target.value })}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='center'>
                  <Button variant='contained' color='primary' onClick={handleAddRow} startIcon={<AddIcon />}>
                    ADD
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Card>
      </Grid>
    </>
  )
}

const TP_ItemTabPayment = () => {
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
        <CreditCardsOfTp data={productLines} />
        <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
          <Button variant='contained' color='primary'>
            Add bank
          </Button>
        </Grid>
        <BankAccountsOfTp data={productLines} />
        <Grid container justifyContent={'space-between'} flexDirection={'row'} columnGap={2} rowGap={6}>
          <Box width={'100%'}>
            <Typography variant='h5' gutterBottom>
              Linked files
            </Typography>
            <Card>
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
                    <TableCell colSpan={5} align='center'>
                      None
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            </Card>
            <Box width={'100%'}>
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
        </Grid>
      </Grid>
    </>
  )
}

export default TP_ItemTabPayment
