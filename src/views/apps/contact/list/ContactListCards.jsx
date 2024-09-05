// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { useEffect, useState } from 'react'

const UserListCards = ({ series }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    let k = []
    series.map((ser, i) => {
      let ttile
      let avatarIcon

      switch (i) {
        case 0:
          ttile = 'Customers'
          avatarIcon = 'ri-user-2-line'
          break
        case 1:
          ttile = 'Prospects'
          avatarIcon = 'ri-user-4-line'
          break
        case 2:
          ttile = 'Others'
          avatarIcon = 'ri-user-line'
          break
        case 3:
          ttile = 'Suppliers'
          avatarIcon = 'ri-store-3-line'
          break
        default:
          ttile = 'Others'
          avatarIcon = 'ri-user-line'
          break
      }

      k.push({
        title: ttile,
        stats: `${ser}`,
        avatarIcon: avatarIcon,
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
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
