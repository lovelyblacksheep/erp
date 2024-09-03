'use client';

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserLeftOverview from '@views/apps/contact/view/user-left-overview'
import UserRight from '@views/apps/contact/view/user-right'

// React Imports
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPricingData } from '@/app/server/actions';
import LoadingSpinner from '@/components/Loading';
import { getThirdParty } from '@/libs/api/third-parties';

// Data Fetching
const fetchPricingData = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/pages/pricing`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

// Dynamic Imports for Tabs
// const OverViewTab = dynamic(() => import('@views/apps/contact/view/user-right/overview'))
// const SecurityTab = dynamic(() => import('@views/apps/user/view/user-right/security'))
// const BillingPlans = dynamic(() => import('@views/apps/user/view/user-right/billing-plans'))
// const NotificationsTab = dynamic(() => import('@views/apps/user/view/user-right/notifications'))
// const ConnectionsTab = dynamic(() => import('@views/apps/user/view/user-right/connections'))
const OverviewTab = dynamic(() => import('@views/apps/contact/view/user-right/third-party'))
const ContactsTab = dynamic(() => import('@views/apps/contact/view/user-right/contact/page'))
const CustomerTab = dynamic(() => import('@views/apps/contact/view/user-right/customer/page'))
const CustomerPricesTab = dynamic(() => import('@views/apps/contact/view/user-right/customer_prices/page'))
const ProjectsTab = dynamic(() => import('@views/apps/contact/view/user-right/projects/page'))
const RelatedItemsTab = dynamic(() => import('@views/apps/contact/view/user-right/related/page'))
const PaymentMethodsTab = dynamic(() => import('@views/apps/contact/view/user-right/payment/page'))
const WebAccessTab = dynamic(() => import('@views/apps/contact/view/user-right/web_access/page'))
const TicketsTab = dynamic(() => import('@views/apps/contact/view/user-right/tickets/page'))
const MarginsTab = dynamic(() => import('@views/apps/contact/view/user-right/margins/page'))
const NotificationsTab = dynamic(() => import('@views/apps/contact/view/user-right/notifications/page'))
const NotesTab = dynamic(() => import('@views/apps/contact/view/user-right/notes/page'))
const LinkedFilesTab = dynamic(() => import('@views/apps/contact/view/user-right/linked_files/page'))
const EventsTab = dynamic(() => import('@views/apps/contact/view/user-right/events/page'))


const UserViewTab = () => {
  const [data, setData] = useState(null)
  const params = useParams()
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      // const pricingData = await getPricingData()
      // setData(pricingData)
      const response = await getThirdParty(params.id)
      if (response.status !== 200) {
          throw new Error('Failed to fetch data')
      }
      const data = response.data;
      setData(data);
    }

    fetchData()
  }, [])

  const tabContentList = data => ({
    overview: <OverviewTab />,
    contact: <ContactsTab />,
    customer: <CustomerTab />,
    customer_prices: <CustomerPricesTab />,
    projects: <ProjectsTab />,
    related: <RelatedItemsTab />,
    payment: <PaymentMethodsTab />,
    web_access: <WebAccessTab />,
    tickets: <TicketsTab />,
    margins: <MarginsTab />,
    notifications: <NotificationsTab />,
    notes: <NotesTab />,
    linked_files: <LinkedFilesTab />,
    events: <EventsTab />
    // security: <SecurityTab />,
    // 'billing-plans': <BillingPlans data={data} />,
    // notifications: <NotificationsTab />,
    // connections: <ConnectionsTab />
  })

  return (
    <Grid container spacing={6}>
      {data ? <>
        <Grid item xs={12} lg={4} md={5}>
          <UserLeftOverview data={data} />
        </Grid>
        <Grid item xs={12} lg={8} md={7}>
          {data ? <UserRight tabContentList={tabContentList(data)} /> : <LoadingSpinner />}
        </Grid>
      </> : <LoadingSpinner />}
    </Grid>
  )
}

export default UserViewTab