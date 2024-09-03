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
    label: 'Manufacturing Order',
    href: 'overview',
    icon: 'ri-settings-2-line' // Assuming a settings icon for manufacturing orders
},
{
    label: 'Production',
    href: 'production',
    icon: 'ri-line-chart-line' // Assuming a statistics icon for production
},
{
    label: 'Stock movements',
    href: 'stock_movements',
    icon: 'ri-store-3-line' // Assuming a warehouse/store icon for stock movements
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
    label: 'Events',
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
