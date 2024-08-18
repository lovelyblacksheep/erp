'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, Tab, Grid, Typography, TextField, Box, Container } from '@mui/material';
import { styled } from '@mui/system';


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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';


const MRP_BOM_ItemTabNotes = ({ }) => {

    const [editMode, setEditMode] = useState(null);

    const handleSave = async (e) => {
        if(editMode === "public") {

        }
        else if(editMode === "private") {
            
        }
        setEditMode(null);
    }

  return (
    <>
      <Grid item xs={12} display={"flex"} flexDirection={"column"} rowGap={8}>

        <Box p={6} border={1} borderColor="grey.300" borderRadius={1} display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} rowGap={4}>

          {/* Top Section */}
          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Grid item>
              <Box mb={2} display={"flex"} justifyContent={"flex-start"} flexDirection={"row"} gap={"20px"} alignItems={"center"}>
                <Box
                  width={50}
                  height={50}
                  bgcolor="grey.200"
                  // borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                >
                  {/* Image Placeholder */}
                  {/* <Typography variant="body1" color="textSecondary">
                  No Image
                </Typography> */}
                  <img width={64}
                    height={64} src='https://f.start.me/us.gov' />
                </Box>
                <Typography variant="h6" component="div">
                  BOM2310-0001
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Link href="/mrp/bom/list" variant="body2" underline="hover">
                Back to list
              </Link>
            </Grid>
          </Grid>

          {/* Main Content Section */}
          <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box sx={{ mb: 8 }}>
                <Typography variant="body1" display={"flex"} justifyContent={"space-between"} alignItems={"center"} gutterBottom>
                    <span>Note (public)</span>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <IconButton disabled={editMode === "public"} color="primary" onClick={() => setEditMode("public")}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Typography>
                <TextField
                    multiline
                    minRows={4}
                    variant="outlined"
                    fullWidth
                    value={"publicNote"}
                    disabled={editMode === "public" ? false : true}
                />
                {editMode === "public" && <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button onClick={handleSave} variant="contained" color="secondary" sx={{ mr: 1 }}>
                        Save
                    </Button>
                    <Button onClick={() => setEditMode(null)}  variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>}
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" display={"flex"} justifyContent={"space-between"} alignItems={"center"} gutterBottom>
                    <span>Note (private)</span>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <IconButton disabled={editMode === "private"} color="primary" onClick={() => setEditMode("private")}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Typography>
                <TextField
                    multiline
                    minRows={4}
                    variant="outlined"
                    fullWidth
                    value={"privateNote"}
                    disabled={editMode === "private" ? false : true}
                />
                {editMode === "private" && <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button onClick={handleSave} variant="contained" color="secondary" sx={{ mr: 1 }}>
                        Save
                    </Button>
                    <Button onClick={() => setEditMode(null)} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>}
            </Box>
        </Container>
        </Box>
      </Grid>
    </>
  );
};

export default MRP_BOM_ItemTabNotes;