'use client'

import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Tabs, Tab, Grid, Typography, TextField, Box, FormControlLabel, Checkbox } from '@mui/material'
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
  MenuItem,
  InsertDriveFileIcon
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { getLinkedFilesOf } from '@/libs/api/linked_files'
import LoadingSpinner from '@/components/Loading'
import ErrorMessage from '@/components/error/ErrorPage'

const data = [
  {
    description: '005 - guayabera',
    qty: 100,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 0
  },
  {
    description: 'Полуфабрикат_1 - Полуфабрикат 1',
    qty: 1,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 0
  },
  {
    description: 'LECHE_POLVO - Leche en Polvo Entera',
    qty: 1,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 0
  },
  {
    description: '_SILLA_A_B_4_23_GOLD_KERNE',
    qty: 1,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 80
  },
  {
    description: 'BABY_KLIM_1_Lata_Cantag_6x400g_CO',
    qty: 1,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 0
  }
]

const Tp_ItemTabLinkedFiles = ({ }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const thirdPartyId = params.id
  const [linkedFiles, setLinkedFiles] = useState([]);

  async function fetchLinkedFiles() {
    try {
      const response = await getLinkedFilesOf('bom', thirdPartyId)
      if (response.status !== 200) {
        throw new Error('Failed to fetch Third Party data')
      }
      const data = response.data
      setLinkedFiles(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {

    if (thirdPartyId) {
      fetchLinkedFiles();
    }
  }, [thirdPartyId])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Handle the file upload process
      console.log('File uploaded:', selectedFile.name)
    } else {
      alert('Please select a file to upload.')
    }
  }

  return (
    <>
      <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
        <Paper p={6} border={1} borderColor='grey.300' borderRadius={1}>

          {/* Main Content Section */}
          <Grid container spacing={2} p={6}>
            {/* Left Column */}
            <Grid item xs={6}>
              {/* Details */}
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Number of attached files/documents</Typography>
                <Typography variant='body2'>1</Typography>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography color='text.primary' className='font-medium'>Total size of attached files/documents</Typography>
                <Typography variant='body2'>42510 bytes</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container justifyContent={'space-between'} flexDirection={'row'} columnGap={2} rowGap={6}>
          <Box width={'100%'}>
            <Typography variant='h5' gutterBottom>
              Attach a new file/document
            </Typography>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} columnGap={4} alignItems={'center'}>
                <Button component='label' startIcon={<UploadFileIcon />}>
                  Select File
                  <input type='file' hidden onChange={handleFileChange} />
                </Button>
                {selectedFile && <Typography variant='body2'>Selected File: {selectedFile.name}</Typography>}
                <Button variant='contained'>Upload</Button>
              </Grid>
              <Grid>
                <FormControlLabel
                  control={<Checkbox color='primary' />}
                  label={`Save file on server with name "BOM2310-0001-Original filename" (otherwise "Original filename")`}
                />
              </Grid>
            </Box>
          </Box>

          <Box width={'100%'}>
            <Typography variant='h5' gutterBottom>
              Link a new file/document
            </Typography>
            <Box width={'100%'}>
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} columnGap={4} alignItems={'center'} mb={2}>
                <TextField label='URL to link' type='url' variant='outlined' />
                <TextField label='Label' type='text' variant='outlined' />
              </Grid>
              <Grid>
                <Button variant='contained'>Link</Button>
              </Grid>
            </Box>
          </Box>

          <Box width={'100%'}>
            <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='h5' gutterBottom>
                Attached files and documents
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
                  {linkedFiles.length < 1 ? <TableRow>
                    <TableCell colSpan={4} align='center'>
                      None
                    </TableCell>
                  </TableRow> : (
                    linkedFiles.map((file) => {
                      return (
                        <TableRow key={file.id}>
                          <TableCell>
                            {file.name}
                          </TableCell>
                          <TableCell>
                            {file.size}
                          </TableCell>
                          <TableCell>
                            {(new Date(file.date_c)).toDateString()}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

        </Grid>
      </Grid>
    </>
  )
}

export default Tp_ItemTabLinkedFiles
