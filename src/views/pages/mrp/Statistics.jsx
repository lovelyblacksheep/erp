'use client'

// Next Imports
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

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
  series5: '#ff7043',
  series6: '#8e24aa',
  series7: '#ffca28',
  series8: '#66bb6a'
}

const Statistics = () => {
  const theme = useTheme()
  const [series, setSeries] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    const fetchData = async () => {
      const statuses = [
        'draft',
        'validated',
        'approved',
        'running',
        'received_start',
        'received_end',
        'cancelled',
        'refused'
      ]
      const fetchStatusCount = async status => {
        const result = await axios.get(`${apiUrl}/supplierorders`, {
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
            page: 0,
            status,
            DOLAPIKEY: apiKey
          }
        })
        return result.data.length
      }

      const data = await Promise.all(statuses.map(fetchStatusCount))
      setSeries(data)
    }

    fetchData()
  }, [])

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
