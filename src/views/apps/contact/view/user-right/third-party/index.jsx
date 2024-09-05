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
    MenuItem,
    CardContent,
    Card
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import { deleteThirdParty, getThirdParty, updateThirdParty } from '@/libs/api/third-parties'
import LoadingSpinner from '@/components/Loading'
import { getLinkedFilesOf } from '@/libs/api/linked_files'
import ErrorMessage from '@/components/error/ErrorPage'
import { getEventsForThirdParty } from '@/libs/api/event'

function NotFoundMessage({error}) {
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

    async function handleReopen(e) {
        setIsLoading(true)
        try {
            const response = await updateThirdParty({
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

    async function handleDeleteTp(e) {
        setIsLoading(true)
        try {
            const response = await deleteThirdParty(thirdPartyId);
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

    async function handleClonTp(e) {
        // setIsLoading(true)
        // try {
        //     const response = await deleteBom(thirdPartyId);
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

    async function handleValidateTp(e) {
        setIsLoading(true)
        try {
            const response = await updateThirdParty({
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

    async function handleCreateMo(e) {
    }

    async function handleDisableTp(e) {
        setIsLoading(true)
        try {
            const response = await updateThirdParty({
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

    const handleBackToDraft = async (e) => {
        setIsLoading(true)
        try {
            const response = await updateThirdParty({
                status: 0   // disable it
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
            const response = await getLinkedFilesOf('thirdparty', thirdPartyId)
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
            const response = await getEventsForThirdParty(thirdPartyId)
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

    return (
        <>
            <Grid item xs={12} display={'flex'} flexDirection={'column'} rowGap={8}>
                <Card p={6} border={1} borderColor='grey.300' borderRadius={1}>
                    <CardContent className='flex flex-col gap-6'>
                    {/* Main Content Section */}
                    <Grid container spacing={2} p={6}>
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
                
                    </CardContent>
                </Card>

                {`${thirdPartyData.status}` === '9' ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    {/* <Button variant='contained' color='primary' onClick={handleReopen}>
                        Re-Open
                    </Button>
                    <Button onClick={handleClonTp} variant='contained' color='primary'>
                        Clone
                    </Button>
                    <Button onClick={handleDeleteTp} variant='contained' color='error'>
                        Delete
                    </Button> */}
                </Grid> : `${thirdPartyData.status}` === '1' ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary'>
                        Send Email
                    </Button>
                    <Button variant='contained' color='primary' component={Link} href={`../modify/${params.id}`}>
                        Modify
                    </Button>
                    <Button variant='contained' color='primary'>
                        Merge
                    </Button>
                    <Button onClick={handleDeleteTp} variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> : `${thirdPartyData.status}` === '0' ? <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary' component={Link} href={`../modify/${params.id}`}>
                        Modify
                    </Button>
                    <Button onClick={handleValidateTp} variant='contained' color='primary'>
                        Validate
                    </Button>
                    {/* <Button onClick={handleClonTp} variant='contained' color='primary'>
                        Clone
                    </Button> */}
                    <Button onClick={handleDeleteTp} variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> : ''}

                {/* <Grid container justifyContent='flex-end' columnGap={4} alignItems='center'>
                    <Button variant='contained' color='primary'>
                        Send Email
                    </Button>
                    <Button variant='contained' color='primary' component={Link} href={`../modify/${params.id}`}>
                        Modify
                    </Button>
                    <Button variant='contained' color='primary'>
                        Merge
                    </Button>
                    <Button variant='contained' color='error'>
                        Delete
                    </Button>
                </Grid> */}

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
                                                        {(new Date(file.date_c*1000)).toDateString()}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Card>
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
                        <Card>
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
                                                        {'User with id '+e.userownerid}
                                                    </TableCell>
                                                    <TableCell>
                                                        {e.label}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(new Date(e.datec*1000)).toDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default TP_ItemTabThirdParty
