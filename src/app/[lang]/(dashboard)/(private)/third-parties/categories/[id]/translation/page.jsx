'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiKey, apiUrl } from '@/config'
import Link from 'next/link'
import {
  Grid,
  Typography,
  TextField,
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
import { getBom } from '@/libs/api/bom'
import { getThirdParty } from '@/libs/api/third-parties'
import { getCategory } from '@/libs/api/category'


const InfoItem = ({ label, value }) => (
  <Box display='flex' justifyContent='space-between' mb={1}>
    <Typography variant='body2' color='text.secondary'>
      {label}
    </Typography>
    <Typography variant='body2'>{value}</Typography>
  </Box>
)

const CT_ItemTabTranslation = () => {
  const [bomData, setBomData] = useState(null)
  const [warehouseData, setWarehouseData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id: bomId } = useParams()

  useEffect(() => {
    const fetchBomData = async () => {
      setIsLoading(true)
      try {
        const response = await getCategory(bomId)
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
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  overflow='hidden'
                >
                  <img width={64} height={64} src='https://f.start.me/us.gov' alt='BOM' />
                </Box>
                <Box>
                <Typography variant='h6' component='div'>
                  {bomData.label || 'No label'}
                </Typography>
                <Typography>{`${bomData.fk_parent}` === "0" ? `Root >> ${bomData.label}` : ''}</Typography>
                </Box>
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
                <Typography variant='subtitle2'>Description</Typography>
                <Typography variant='body2'>{bomData.description || '-'}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='subtitle2'>Color</Typography>
                <Typography variant='body2'>{bomData.color || '-'}</Typography>
              </Box>
            </Grid>

          </Grid>
        </Box>

        <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
          <Button variant='contained' color='primary'>
            Add Translation
          </Button>
        </Grid>

        <Grid container justifyContent={'space-between'} flexDirection={'row'} columnGap={2} rowGap={6}>
            <Typography>No translation</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default CT_ItemTabTranslation;
