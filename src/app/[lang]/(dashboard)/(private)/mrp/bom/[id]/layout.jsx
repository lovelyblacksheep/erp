'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, Tab, Grid, Typography, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';
import MRP_BOM_ItemTabBOM from './bom/page';

const createLink = (newTab) => {
  const params = useParams();
  const { id } = params; // Assuming your dynamic segment is `id`

  return {
    pathname: `/mrp/bom/${id}/${newTab}`,
  };
};

const StyledTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minWidth: 72,
  fontWeight: 600,
  marginRight: 24,
  '&.Mui-selected': {
    color: '#1890ff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
});


const BOMItemTabs = {
  bom: "/bom",
  bomNetNeeds: "/net_needs",
  notes: "/notes",
  linked: "/linked_files",
  events: "/events"
};


const MRP_BOM_Item = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if(pathname.endsWith(BOMItemTabs.bom)) {
      return BOMItemTabs.bom; 
    }
    else if(pathname.endsWith(BOMItemTabs.bomNetNeeds)) {
      return BOMItemTabs.bomNetNeeds; 
    }
    else if(pathname.endsWith(BOMItemTabs.linked)) {
      return BOMItemTabs.linked; 
    }
    else if(pathname.endsWith(BOMItemTabs.notes)) {
      return BOMItemTabs.notes; 
    }
    else if(pathname.endsWith(BOMItemTabs.events)) {
      return BOMItemTabs.events; 
    }
    return BOMItemTabs.bom; 
    // return Object.values(BOMItemTabs).includes(pathname) ? pathname : BOMItemTabs.bom;
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StyledTabs value={getActiveTab()} aria-label="BOM tabs">
          <StyledTab value={BOMItemTabs.bom} label="Bill Of Materials" component={Link} href={createLink(BOMItemTabs.bom)} />
          <StyledTab value={BOMItemTabs.bomNetNeeds} label="BOM Net Needs" component={Link} href={createLink(BOMItemTabs.bomNetNeeds)} />
          <StyledTab value={BOMItemTabs.notes} label="Notes" component={Link} href={createLink(BOMItemTabs.notes)} />
          <StyledTab value={BOMItemTabs.linked} label="Linked files" component={Link} href={createLink(BOMItemTabs.linked)} />
          <StyledTab value={BOMItemTabs.events} label="Events" component={Link} href={createLink(BOMItemTabs.events)} />
        </StyledTabs>
      </Grid>
      {children ? children : <MRP_BOM_ItemTabBOM />}
    </Grid>
  );
};

export default MRP_BOM_Item;