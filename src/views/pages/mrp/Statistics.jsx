'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1',
  series6: '#ffb74d',
  series7: '#4db6ac',
  series8: '#9575cd'
}

const Statistics = () => {
  const theme = useTheme()

  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options = {
    stroke: { width: 0 },
    labels: ['draft', 'validated', 'approved', 'running', 'received_start', 'received_end', 'cancelled', 'refused'],
    colors: [
      donutColors.series1,
      donutColors.series2,
      donutColors.series3,
      donutColors.series4,
      donutColors.series5,
      donutColors.series6,
      donutColors.series7,
      donutColors.series8
    ],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: textSecondary,
              formatter: val => `${parseInt(val, 10)}`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = [85, 16, 50, 50, 10, 5, 25, 30]

  return (
    <Card>
      <CardHeader title='Statistics' />
      <CardContent>
        <AppReactApexCharts type='donut' width='100%' height={400} options={options} series={series} />

        <div className='border-t pt-5 mt-5 flex items-center justify-between'>
          <span>Total number of Third Parties</span>
          <span className='font-bold'>
            {series.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Statistics
