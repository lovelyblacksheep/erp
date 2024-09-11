// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { useEffect, useState } from 'react'

// Vars
const data = [
  {
    title: 'Session',
    stats: '21,459',
    avatarIcon: 'ri-group-line',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '29%',
    subtitle: 'Total User'
  },
  {
    title: 'Paid Users',
    stats: '4,567',
    avatarIcon: 'ri-user-add-line',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '18%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Active Users',
    stats: '19,860',
    avatarIcon: 'ri-user-follow-line',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '14%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Pending Users',
    stats: '237',
    avatarIcon: 'ri-user-search-line',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '42%',
    subtitle: 'Last week analytics'
  }
]

const UserListCards = ({ series }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    let k = []
    series.map((ser, i) => {
      let ttile = i === 0 ? 'Bill of Materials' : i === 1 ? 'Manufacturing orders' : 'Others'
      k.push({
        title: ttile,
        stats: `${ser}`,
        avatarIcon: 'ri-building-4-fill',
        avatarColor: 'primary',
        trend: null,
        trendNumber: '',
        subtitle: 'Total'
      })
    })
    console.log('S :: ', series)
    setData(k)
  }, [series])

  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
