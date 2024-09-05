// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { useEffect, useState } from 'react'

// // Vars
// const data = [
//   {
//     title: 'Propsect',
//     stats: '21,459',
//     avatarIcon: 'ri-group-line',
//     avatarColor: 'primary',
//     trend: 'positive',
//     trendNumber: '29%',
//     subtitle: 'Total contacts'
//   },
//   {
//     title: 'Paid Users',
//     stats: '4,567',
//     avatarIcon: 'ri-user-add-line',
//     avatarColor: 'error',
//     trend: 'positive',
//     trendNumber: '18%',
//     subtitle: 'Last week analytics'
//   },
//   {
//     title: 'Active Users',
//     stats: '19,860',
//     avatarIcon: 'ri-user-follow-line',
//     avatarColor: 'success',
//     trend: 'negative',
//     trendNumber: '14%',
//     subtitle: 'Last week analytics'
//   },
//   {
//     title: 'Pending Users',
//     stats: '237',
//     avatarIcon: 'ri-user-search-line',
//     avatarColor: 'warning',
//     trend: 'positive',
//     trendNumber: '42%',
//     subtitle: 'Last week analytics'
//   }
// ]

const UserListCards = ({series}) => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    let k = [];
    series.map((ser, i) => {
      let ttile = i === 0 ? "Customers" : i === 1 ? "Prospects" : i === 2 ? "Others" : i === 3 ? "Suppliers" : "Others";
      k.push({
        title: ttile,
        stats: `${ser}`,
        avatarIcon: 'ri-user-search-line',
        avatarColor: 'primary',
        trend: null,
        trendNumber: '',
        subtitle: 'Total'
      })
    })
    console.log("S :: ", series)
    setData(k);
  }, [series]);

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
