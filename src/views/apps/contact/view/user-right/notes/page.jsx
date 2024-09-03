'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Grid, Typography, TextField, Box, Container, IconButton, Button, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { apiKey, apiUrl } from '@/config'

const TP_ItemTabNotes = () => {
  const { id: bomId } = useParams()
  const [bomData, setBomData] = useState(null)
  const [editMode, setEditMode] = useState(null)
  const [publicNote, setPublicNote] = useState('')
  const [privateNote, setPrivateNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBomData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/thirdparties/${bomId}`, {
        headers: {
          DOLAPIKEY: apiKey
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch BOM data')
      }
      const data = await response.json()
      setBomData(data)
      setPublicNote(data.note_public || '')
      setPrivateNote(data.note_private || '')
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (bomId) {
      fetchBomData()
    }
  }, [bomId])

  const handleSave = async noteType => {
    try {
      const response = await fetch(`${apiUrl}/thirdparties/${bomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          DOLAPIKEY: apiKey
        },
        body: JSON.stringify({
          [noteType === 'public' ? 'note_public' : 'note_private']: noteType === 'public' ? publicNote : privateNote
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update note')
      }
      await fetchBomData()
    } catch (error) {
      console.error('Error updating note:', error)
      setError(error.message)
    }
    setEditMode(null)
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color='error'>Error: {error}</Typography>
  }

  const renderNoteSection = (noteType, noteValue, setNoteValue) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' gutterBottom display='flex' justifyContent='space-between' alignItems='center'>
        Note ({noteType})
        <IconButton disabled={editMode === noteType} color='primary' onClick={() => setEditMode(noteType)}>
          <EditIcon />
        </IconButton>
      </Typography>
      {editMode === noteType ? (
        <>
          <TextField
            multiline
            minRows={4}
            variant='outlined'
            fullWidth
            value={noteValue}
            onChange={e => setNoteValue(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => handleSave(noteType)} variant='contained' color='primary' sx={{ mr: 1 }}>
              Save
            </Button>
            <Button onClick={() => setEditMode(null)} variant='outlined'>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <Paper elevation={1} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
          <Typography variant='body1' color='text.primary'>
            {noteValue || `No ${noteType} note available`}
          </Typography>
        </Paper>
      )}
    </Box>
  )

  return (
    <Grid item xs={12} display='flex' flexDirection='column' rowGap={4}>
      <Box p={4} border={1} borderColor='grey.300' borderRadius={1}>

        {/* Main Content Section */}
        <Container maxWidth='md' disableGutters>
          {renderNoteSection('public', publicNote, setPublicNote)}
          {renderNoteSection('private', privateNote, setPrivateNote)}
        </Container>
      </Box>
    </Grid>
  )
}

export default TP_ItemTabNotes
