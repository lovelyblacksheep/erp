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
import LoadingSpinner from '@/components/Loading'
import { getLinkedFilesOf } from '@/libs/api/linked_files'
import ErrorMessage from '@/components/error/ErrorPage'
import { getEventsForThirdParty } from '@/libs/api/event'
import { getEventsForMo, getMo, getMRPType } from '@/libs/api/mo'
import { getBom, getEventsForBom } from '@/libs/api/bom'

function NotFoundMessage({ error }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography>{error}</Typography>
        </div>
    );
}

const InfoItem = ({ label, value }) => (
    <Box mb={2}>
        <Typography color='text.primary' className='font-medium'>{label}</Typography>
        <Typography>{value || '-'}</Typography>
    </Box>
)

const TP_ItemTabThirdParty = () => {
    const [thirdPartyData, setThirdPartyData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useParams()
    const thirdPartyId = params.id

    const [linkedFiles, setLinkedFiles] = useState([]);
    const [events, setEvents] = useState([]);
    const [relatedObjects, setRelatedObjects] = useState([]);
    const [bomServices, setBomServices] = useState([]);


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
            // setError(error.message)
        } finally {
        }
    }

    async function fetchEvents() {
        try {
            const response = await getEventsForBom(thirdPartyId)
            if (response.status !== 200) {
                throw new Error('Failed to fetch Third Party data')
            }
            const data = response.data
            setEvents(data)
        } catch (error) {
            console.error('Error fetching data:', error)
            // setError(error.message)
        } finally {
        }
    }

    useEffect(() => {
        const fetchThirdPartyData = async () => {
            setIsLoading(true)
            try {
                const response = await getBom(thirdPartyId)
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
            fetchLinkedFiles();
            fetchEvents();
        }
    }, [thirdPartyId])

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    if (!thirdPartyData) {
        return <NotFoundMessage error={'No Third Party data available'} />
    }

    const getTitle = () => {
        let d = thirdPartyData || {}
        return d.label || d.name || d.ref || `#${d.id}`;
    }

    return (
        <>
            <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
                <Paper p={6} border={1} borderColor='grey.300' borderRadius={1}>

                    {/* Main Content Section */}
                    <Grid container spacing={2} p={6}>
                        {/* Left Column */}
                        <Grid item xs={6}>
                        <InfoItem label='Label' value={getTitle()} />
                            <InfoItem label='Type' value={getMRPType(thirdPartyData.mrptype)} />
                            <InfoItem label='Product' value={thirdPartyData.fk_product} />
                            <InfoItem label='Qty' value={thirdPartyData.qty} />
                            <InfoItem label='Description' value={thirdPartyData.description} />
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={6}>
                            <InfoItem label='Estimated duration' value={thirdPartyData.warehouse_id} />
                            <InfoItem label='Warehouse for production' value={thirdPartyData.warehouse_id} />
                            <InfoItem label='Total cost' value={''} />
                            <InfoItem label='Unit cost' value={''} />
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary'>
                        Modify
                    </Button>
                    <Button variant='contained' color='primary'>
                        Validate
                    </Button>
                    <Button variant='contained' color='primary'>
                        Clone
                    </Button>
                    <Button variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid>

                <Box width={'100%'}>
                        <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h5' gutterBottom>
                                BOM NET NEEDS
                            </Typography>
                            <Grid>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Physical Stock</TableCell>
                                        <TableCell>Virtual Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bomServices.length === 0 ? <TableRow>
                                        <TableCell colSpan={5} align='center'>
                                            None
                                        </TableCell>
                                    </TableRow> : (
                                        bomServices.map((e) => {
                                            return (
                                                <TableRow key={e.id}>
                                                    <TableCell>
                                                        {e.product}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.qty}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.physical_stock}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.virtual_stock}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

            </Grid>
        </>
    )
}

export default TP_ItemTabThirdParty
