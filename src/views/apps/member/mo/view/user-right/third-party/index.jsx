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
import { deleteMo, getEventsForMo, getMo, getMRPType, updateMo } from '@/libs/api/mo'

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


    async function handleReopen(e) {
        setIsLoading(true)
        try {
            const response = await updateMo({
                status: 1   // enable it
            }, thirdPartyId);
            if (!response.success) {
                throw new Error('Failed to fetch Third Party data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
        await fetchThirdPartyData();
    }

    async function handleDeleteMo(e) {
        setIsLoading(true)
        try {
            const response = await deleteMo(thirdPartyId);
            if (response.status !== 200) {
                throw new Error('Failed to fetch Third Party data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCloneMo(e) {
        // setIsLoading(true)
        // try {
        //     const response = await deleteMo(thirdPartyId);
        //     if (response.status !== 200) {
        //         throw new Error('Failed to fetch Third Party data')
        //     }
        // } catch (error) {
        //     console.error('Error fetching data:', error)
        //     setError(error.message)
        // } finally {
        //     setIsLoading(false)
        // }
    }

    async function handleValidateMo(e) {
        setIsLoading(true)
        try {
            const response = await updateMo({
                status: 1   // enable it
            }, thirdPartyId);
            if (!response.success) {
                throw new Error('Failed to fetch Third Party data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
        await fetchThirdPartyData();
    }

    async function handleCreateBom(e) {
    }

    async function handleDisableMo(e) {
        setIsLoading(true)
        try {
            const response = await updateMo({
                status: 9   // enable it
            }, thirdPartyId);
            if (!response.success) {
                throw new Error('Failed to fetch Third Party data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
        await fetchThirdPartyData();
    }



    async function fetchLinkedFiles() {
        try {
            const response = await getLinkedFilesOf('mrp', thirdPartyId)
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
            const response = await getEventsForMo(thirdPartyId)
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

    const fetchThirdPartyData = async () => {
        setIsLoading(true)
        try {
            const response = await getMo(thirdPartyId)
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


    useEffect(() => {
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
                            <InfoItem label='Type' value={getMRPType(thirdPartyData.mrptype)} />
                            <InfoItem label='Product' value={thirdPartyData.fk_product} />
                            <InfoItem label='Qty to produce' value={thirdPartyData.qty} />
                            <InfoItem label='Label' value={getTitle()} />
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={6}>
                            <InfoItem label='Warehouse for production' value={thirdPartyData.warehouse_id} />
                            <InfoItem label='Date start planned' value={thirdPartyData.date_start_planned ? (new Date(thirdPartyData.date_start_planned * 1000)).toDateString() : "Not provided"} />
                            <InfoItem label='Date end planned' value={thirdPartyData.date_end_planned ? (new Date(thirdPartyData.date_end_planned * 1000)).toDateString() : "Not provided"} />
                        </Grid>
                    </Grid>
                </Paper>

                {thirdPartyData.status === 9 ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary' onClick={handleReopen}>
                        Re-Open
                    </Button>
                    <Button onClick={handleCloneMo} variant='contained' color='primary'>
                        Clone
                    </Button>
                    <Button onClick={handleDeleteMo} variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> : thirdPartyData.status === 1 ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button onClick={handleBackToDraft} variant='contained' color='primary'>
                        Back to draft
                    </Button>
                    <Button onClick={handleCreateBom} variant='contained' color='primary'>
                        Create BOM
                    </Button>
                    <Button onClick={handleCloneMo} variant='contained' color='primary'>
                        Clone
                    </Button>
                    <Button onClick={handleDisableMo} variant='contained' color='error'>
                        Disable
                    </Button>
                    <Button onClick={handleDeleteMo} variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> : thirdPartyData.status === 0 ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary' component={Link} href={`../modify/${params.id}`}>
                        Modify
                    </Button>
                    <Button onClick={handleValidateMo} variant='contained' color='primary'>
                        Validate
                    </Button>
                    <Button onClick={handleCloneMo} variant='contained' color='primary'>
                        Clone
                    </Button>
                    <Button onClick={handleDeleteMo} variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> : ''}

                <Box width={'100%'}>
                        <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h5' gutterBottom>
                                Summary
                            </Typography>
                            <Grid>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{display: 'none'}}>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Val</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>
                                            Products to consume
                                        </TableCell>
                                        <TableCell align='center'>
                                            
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'>
                                            {"Products to produce"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {thirdPartyData.fk_product}
                                        </TableCell>
                                    </TableRow>
                                    {/* {relatedObjects.length === 0 ? <TableRow>
                                        <TableCell colSpan={5} align='center'>
                                            None
                                        </TableCell>
                                    </TableRow> : (
                                        relatedObjects.map((e) => {
                                            return (
                                                <TableRow key={e.id}>
                                                    <TableCell>
                                                        {e.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.ref}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(new Date(e.datec * 1000)).toDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.status}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

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
                                                        {(new Date(file.date_c * 1000)).toDateString()}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
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
                                        <TableCell>Ref.</TableCell>
                                        <TableCell>By</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events.length === 0 ? <TableRow>
                                        <TableCell colSpan={5} align='center'>
                                            None
                                        </TableCell>
                                    </TableRow> : (
                                        events.map((e) => {
                                            return (
                                                <TableRow key={e.id}>
                                                    <TableCell>
                                                        {e.ref}
                                                    </TableCell>
                                                    <TableCell>
                                                        {'User with id ' + e.userownerid}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.label}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(new Date(e.datec * 1000)).toDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box width={'100%'}>
                        <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h5' gutterBottom>
                                Related objects
                            </Typography>
                            <Grid>
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
                                    {relatedObjects.length === 0 ? <TableRow>
                                        <TableCell colSpan={5} align='center'>
                                            None
                                        </TableCell>
                                    </TableRow> : (
                                        relatedObjects.map((e) => {
                                            return (
                                                <TableRow key={e.id}>
                                                    <TableCell>
                                                        {e.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.ref}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(new Date(e.datec * 1000)).toDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.status}
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
            </Grid>
        </>
    )
}

export default TP_ItemTabThirdParty
