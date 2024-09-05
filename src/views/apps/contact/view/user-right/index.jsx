'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import TP_ItemTabThirdParty from './third-party'
import TP_ItemTabNotes from './notes/page'


const tabs = [
  {
    label: 'Contact data',
    href: 'overview',
    icon: 'ri-user-3-line' // Assuming 'Third-party' refers to 'vender'
  },
  {
    label: 'Contacts/Addresses',
    href: 'contact',
    icon: 'ri-contacts-line'
  },
  {
    label: 'Customer',
    href: 'customer',
    icon: 'ri-user-2-line'
  },
  {
    label: 'Customer prices',
    href: 'customer_prices',
    icon: 'ri-money-dollar-circle-line' // Assuming 'Customer prices' relates to 'Contributions'
  },
  {
    label: 'Projects',
    href: 'projects',
    icon: 'ri-projector-line'
  },
  {
    label: 'Related items',
    href: 'related',
    icon: 'ri-link' // Assuming 'Related items' refers to 'link'
  },
  {
    label: 'Payment methods',
    href: 'payment',
    icon: 'ri-wallet-3-line' // Assuming 'Payment methods' relates to 'accounting'
  },
  {
    label: 'Web access accounts',
    href: 'web_access',
    icon: 'ri-lock-line' // Assuming 'Web access accounts' needs a lock icon, adjust if incorrect
  },
  {
    label: 'Tickets',
    href: 'tickets',
    icon: 'ri-ticket-line' // Assuming 'Tickets' relates to a general ticket icon, adjust if needed
  },
  {
    label: 'Margins',
    href: 'margins',
    icon: 'ri-line-chart-line' // Assuming 'Margins' refers to 'statistics'
  },
  {
    label: 'Notifications',
    href: 'notifications',
    icon: 'ri-notification-2-line' // Assuming a generic notification icon
  },
  {
    label: 'Notes',
    href: 'notes',
    icon: 'ri-sticky-note-line'
  },
  {
    label: 'Linked files',
    href: 'linked_files',
    icon: 'ri-file-line'
  },
  {
    label: 'Events/Agenda',
    href: 'events',
    icon: 'ri-calendar-schedule-line'
  }
];

const UserRight = ({ tabContentList }) => {
  // States
  const [activeTab, setActiveTab] = useState('overview')

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              {/* <Tab icon={<i className='ri-group-line' />} value='overview' label='Overview' iconPosition='start' />
              <Tab icon={<i className='ri-lock-2-line' />} value='security' label='Security' iconPosition='start' />
              <Tab
                icon={<i className='ri-bookmark-line' />}
                value='billing-plans'
                label='Billing & Plans'
                iconPosition='start'
              />
              <Tab
                icon={<i className='ri-notification-4-line' />}
                value='notifications'
                label='Notifications'
                iconPosition='start'
              />
              <Tab icon={<i className='ri-link-m' />} value='connections' label='Connections' iconPosition='start' /> */}
              {tabs.map((tab) => {
                return (
                  <Tab key={tab.href} icon={<i className={tab.icon} />} value={tab.href} label={tab.label} iconPosition='start' />
                );
              })}
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default UserRight
