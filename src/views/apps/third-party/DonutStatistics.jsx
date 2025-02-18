'use client'

//Next imports
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiKey, apiUrl } from '@/config'

// MUI imports
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
  series5: '#ffa1a1'
}

const Statistics = ({text = null}) => {
  // Hooks
  const theme = useTheme()
  const [series, setSeries] = useState([0, 0, 0, 0]) // Initial series state

  useEffect(() => {
    async function fetchData() {
      try {
        const [customers, prospects, others, suppliers] = await Promise.all([
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 1, // Customers
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 2, // Prospects
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 3, // Others
              DOLAPIKEY: apiKey
            }
          }),
          axios.get(`${apiUrl}/thirdparties`, {
            params: {
              sortfield: 't.rowid',
              sortorder: 'ASC',
              limit: 100,
              mode: 4, // Suppliers
              DOLAPIKEY: apiKey
            }
          })
        ])

        setSeries([customers.data.length, prospects.data.length, others.data.length, suppliers.data.length])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options = {
    stroke: { width: 0 },
    labels: ['Customers', 'Prospects', 'Others', 'Suppliers'],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
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
            // total: {
            //   show: true,
            //   fontSize: '1.2rem',
            //   label: 'Operational',
            //   formatter: () => '31%',
            //   color: 'var(--mui-palette-text-primary)'
            // }
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
                  },
                  total: {
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
      <CardHeader title={text || 'Statistics' }/>
      <CardContent>
        <AppReactApexCharts type='donut' width='100%' height={400} options={options} series={series} />

        <div className='border-t pt-5 mt-5 flex items-center justify-between'>
          <span>Total number of Contacts</span>
          <span className='font-bold'>
            {series.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Statistics
