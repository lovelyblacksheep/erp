"use client";

import Link from '@/components/Link';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const StyledTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
  '& .MuiTabs-scrollButtons': {
    color: '#1890ff',
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

const createLink = (newTab) => {
  const params = useParams();
  const { id } = params;

  return {
    pathname: `/third-parties/${id}/${newTab}`,
  };
};

const tabs = [
  {
    label: 'Third-party',
    href: 'third-party'
  },
  {
    label: 'Contacts/Addresses',
    href: 'contact'
  },
  {
    label: 'Customer',
    href: 'customer'
  },
  {
    label: 'Customer prices',
    href: 'customer_prices'
  },
  {
    label: 'Projects',
    href: 'projects'
  },
  {
    label: 'Related items',
    href: 'related'
  },
  {
    label: 'Payment methods',
    href: 'payment'
  },
  {
    label: 'Partnerships',
    href: 'partnership'
  },
  {
    label: 'Tickets',
    href: 'tickets'
  },
  {
    label: 'Margins',
    href: 'margins'
  },
  {
    label: 'Notifications',
    href: 'notifications'
  },
  {
    label: 'Notes',
    href: 'notes'
  },
  {
    label: 'Linked files',
    href: 'linked_files'
  },
  {
    label: 'Events/Agenda',
    href: 'events'
  }
]

const ThirdPartyLayout = ({ children }) => {

  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const getActiveTab = () => {
    let active = 0;
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      let p = pathname.split("/");
      if (p[p.length - 1] === tab.href) {
        active = i;
        break;
      }
    }
    setActiveTab(active);
  };

  useEffect(() => {
    getActiveTab();
  }, [pathname]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StyledTabs
          value={tabs[activeTab].href}
          aria-label="Third party tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => {
            return (
              <StyledTab key={tab.href} value={tab.href} label={tab.label} component={Link} href={createLink(tab.href)} />
            );
          })}
        </StyledTabs>
      </Grid>
      {children ? children : <MRP_BOM_ItemTabBOM />}
    </Grid>
  )
}

export default ThirdPartyLayout;