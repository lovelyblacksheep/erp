'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, Tab, Grid, Typography, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

const InfoItem = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

const MRP_BOM_ItemTabNetNeeds = ({}) => {
  return (
    <Box p={3}>
        <Typography variant="h6" gutterBottom>BOM2310-0001</Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Label" value="XYZ" margin="normal" />
          <TextField fullWidth label="Type" value="Manufacturing" margin="normal" />
          <TextField fullWidth label="Product" value="CANONC3520" margin="normal" />
          <TextField fullWidth label="Quantity" value="100.00" margin="normal" />
          <TextField fullWidth label="Description" margin="normal" />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoItem label="Estimated duration" value="" />
          <InfoItem label="Warehouse for production" value="0000000" />
          <InfoItem label="Total cost" value="9,786.35" />
          <InfoItem label="Unit cost" value="97.8635" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MRP_BOM_ItemTabNetNeeds;