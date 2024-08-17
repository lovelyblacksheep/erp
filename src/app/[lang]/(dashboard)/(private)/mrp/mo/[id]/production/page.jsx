'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, Tab, Grid, Typography, TextField, Box } from '@mui/material';
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

const data = [
  { description: '005 - guayabera', qty: 100, frozenQty: 1, stockChangeDisabled: 1, manufacturingEfficiency: 1, totalCost: 0 },
  { description: 'Полуфабрикат_1 - Полуфабрикат 1', qty: 1, frozenQty: 1, stockChangeDisabled: 1, manufacturingEfficiency: 1, totalCost: 0 },
  { description: 'LECHE_POLVO - Leche en Polvo Entera', qty: 1, frozenQty: 1, stockChangeDisabled: 1, manufacturingEfficiency: 1, totalCost: 0 },
  { description: '_SILLA_A_B_4_23_GOLD_KERNE', qty: 1, frozenQty: 1, stockChangeDisabled: 1, manufacturingEfficiency: 1, totalCost: 80 },
  { description: 'BABY_KLIM_1_Lata_Cantag_6x400g_CO', qty: 1, frozenQty: 1, stockChangeDisabled: 1, manufacturingEfficiency: 1, totalCost: 0 },
];

const BomNetNeedsProductsTable = () => {

  const [newRow, setNewRow] = useState({
    description: '',
    qty: 1,
    frozenQty: 1,
    stockChangeDisabled: 1,
    manufacturingEfficiency: 1,
    totalCost: 0,
  });

  const handleAddRow = () => {
    setData([...data, newRow]);
    setNewRow({
      description: '',
      qty: 1,
      frozenQty: 1,
      stockChangeDisabled: 1,
      manufacturingEfficiency: 1,
      totalCost: 0,
    });
  };


  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Box mb={2} display={"flex"} justifyContent={"flex-start"} flexDirection={"row"} gap={"20px"} alignItems={"center"}>
            <Typography variant="h5" component="div">
              BOM Net Needs
            </Typography>
          </Box>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Frozen Qty</TableCell>
                <TableCell align="right">Stock change disabled</TableCell>
                <TableCell align="right">Manufacturing efficiency</TableCell>
                <TableCell align="right">Total cost</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.frozenQty}</TableCell>
                  <TableCell align="right">{row.stockChangeDisabled}</TableCell>
                  <TableCell align="right">{row.manufacturingEfficiency}</TableCell>
                  <TableCell align="right">{row.totalCost.toFixed(2)}</TableCell>
                  <TableCell align="center">
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
                    variant="outlined"
                    placeholder="Product"
                    value={newRow.description}
                    onChange={(e) =>
                      setNewRow({ ...newRow, description: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={newRow.qty}
                    onChange={(e) =>
                      setNewRow({ ...newRow, qty: Number(e.target.value) })
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={newRow.frozenQty}
                    onChange={(e) =>
                      setNewRow({ ...newRow, frozenQty: Number(e.target.value) })
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={newRow.stockChangeDisabled}
                    onChange={(e) =>
                      setNewRow({
                        ...newRow,
                        stockChangeDisabled: Number(e.target.value),
                      })
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={newRow.manufacturingEfficiency}
                    onChange={(e) =>
                      setNewRow({
                        ...newRow,
                        manufacturingEfficiency: Number(e.target.value),
                      })
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={newRow.totalCost}
                    onChange={(e) =>
                      setNewRow({ ...newRow, totalCost: Number(e.target.value) })
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRow}
                    startIcon={<AddIcon />}
                  >
                    ADD
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};


const InfoItem = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);


const MRP_BOM_ItemTabNetNeeds = ({ }) => {
  return (
    <>
      <Grid item xs={12} display={"flex"} flexDirection={"column"} rowGap={8}>

        <Box p={6} border={1} borderColor="grey.300" borderRadius={1}>

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
              <Link href="#" variant="body2" underline="hover">
                Back to list
              </Link>
            </Grid>
          </Grid>

          {/* Main Content Section */}
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>

              {/* Details */}
              <Box mb={2}>
                <Typography variant="subtitle2">Label</Typography>
                <Typography variant="body2">XYZ</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography variant="body2">Manufacturing</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Product</Typography>
                <Link href="#" variant="body2">
                  CANONC3520
                </Link>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Quantity</Typography>
                <Typography variant="body2">100.00</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body2">-</Typography>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="subtitle2">Estimated duration</Typography>
                <Typography variant="body2">-</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Warehouse for production</Typography>
                <Link href="#" variant="body2">
                  0000000
                </Link>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Total cost</Typography>
                <Typography variant="body2">9,786.35</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Unit cost</Typography>
                <Typography variant="body2">97.8635</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <BomNetNeedsProductsTable />
      </Grid>
    </>
  );
};

export default MRP_BOM_ItemTabNetNeeds;