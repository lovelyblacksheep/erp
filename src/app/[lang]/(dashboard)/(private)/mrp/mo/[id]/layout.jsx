'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, Tab, Grid, Typography, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';
import MRP_MO_ItemTabMO from './mo/page';

const createLink = (newTab) => {
  const params = useParams();
  const { id } = params; // Assuming your dynamic segment is `id`

  return {
    pathname: `/mrp/mo/${id}/${newTab}`,
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


const MOItemTabs = {
  mo: "/mo",
  production: "/production",
  stock_movements: "/stock_movements",
  notes: "/notes",
  linked: "/linked_files",
  events: "/events",
  
};


const MRP_MO_Item = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if(pathname.endsWith(MOItemTabs.mo)) {
      return MOItemTabs.mo; 
    }
    else if(pathname.endsWith(MOItemTabs.production)) {
      return MOItemTabs.production; 
    }
    else if(pathname.endsWith(MOItemTabs.stock_movements)) {
      return MOItemTabs.stock_movements; 
    }
    else if(pathname.endsWith(MOItemTabs.linked)) {
      return MOItemTabs.linked; 
    }
    else if(pathname.endsWith(MOItemTabs.notes)) {
      return MOItemTabs.notes; 
    }
    else if(pathname.endsWith(MOItemTabs.events)) {
      return MOItemTabs.events; 
    }
    return MOItemTabs.mo; 
    // return Object.values(MOItemTabs).includes(pathname) ? pathname : MOItemTabs.mo;
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StyledTabs value={getActiveTab()} aria-label="MO tabs">
          <StyledTab value={MOItemTabs.mo} label="Manufacturing Order" component={Link} href={createLink(MOItemTabs.mo)} />
          <StyledTab value={MOItemTabs.production} label="Production" component={Link} href={createLink(MOItemTabs.production)} />
          <StyledTab value={MOItemTabs.stock_movements} label="Stock movements" component={Link} href={createLink(MOItemTabs.stock_movements)} />
          <StyledTab value={MOItemTabs.notes} label="Notes" component={Link} href={createLink(MOItemTabs.notes)} />
          <StyledTab value={MOItemTabs.linked} label="Linked files" component={Link} href={createLink(MOItemTabs.linked)} />
          <StyledTab value={MOItemTabs.events} label="Events" component={Link} href={createLink(MOItemTabs.events)} />
        </StyledTabs>
      </Grid>
      {children ? children : <MRP_MO_ItemTabMO />}
    </Grid>
  );
};

export default MRP_MO_Item;
