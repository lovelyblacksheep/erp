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
    const [consumedProducts, setConsumedProducts] = useState([]);
    const [producedProducts, setProducedProducts] = useState([]);
    const [events, setEvents] = useState([]);
    const [relatedObjects, setRelatedObjects] = useState([]);


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

    useEffect(() => {
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

                

            </Grid>
        </>
    )
}

export default TP_ItemTabThirdParty
