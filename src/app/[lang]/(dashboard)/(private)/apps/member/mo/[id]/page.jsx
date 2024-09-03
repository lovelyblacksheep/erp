'use client';

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserLeftOverview from '@views/apps/member/mo/view/user-left-overview'
import UserRight from '@views/apps/member/mo/view/user-right'

// React Imports
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPricingData } from '@/app/server/actions';
import LoadingSpinner from '@/components/Loading';
import { getThirdParty } from '@/libs/api/third-parties';
import { getBom } from '@/libs/api/bom';
import { getMo } from '@/libs/api/mo';

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
const OverviewTab = dynamic(() => import('@views/apps/member/mo/view/user-right/third-party'))
const ProductionTab = dynamic(() => import('@views/apps/member/mo/view/user-right/production/page'))
const StockMovementTab = dynamic(() => import('@views/apps/member/mo/view/user-right/stock_movements/page'))
const NotesTab = dynamic(() => import('@views/apps/member/mo/view/user-right/notes/page'))
const LinkedFilesTab = dynamic(() => import('@views/apps/member/mo/view/user-right/linked_files/page'))
const EventsTab = dynamic(() => import('@views/apps/member/mo/view/user-right/events/page'))


const UserViewTab = () => {
  const [data, setData] = useState(null)
  const params = useParams()
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      // const pricingData = await getPricingData()
      // setData(pricingData)
      const response = await getMo(params.id)
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
    production: <ProductionTab />,
    stock_movements: <StockMovementTab />,
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