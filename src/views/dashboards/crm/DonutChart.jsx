'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [35, 30, 23]

const DonutChart = () => {
  // Hooks
  const theme = useTheme()

  const options = {
    legend: { show: false },
    stroke: { width: 5, colors: ['var(--mui-palette-background-paper)'] },
    grid: {
      padding: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 13
      }
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-success-main)', 'var(--mui-palette-secondary-main)'],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: {
      y: { formatter: val => `${val}%` }
    },
    dataLabels: {
      enabled: false
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%', // Increased donut size
          labels: {
            show: true,
            name: { show: false },
            total: {
              label: '',
              show: true,
              fontWeight: 700, // Increased font weight
              fontSize: '1.5rem', // Increased font size
              color: 'var(--mui-palette-text-secondary)',
              formatter: val => (typeof val === 'string' ? `${val}%` : '12%')
            },
            value: {
              offsetY: 8, // Increased offset for better visibility
              fontWeight: 700, // Increased font weight
              fontSize: '1.25rem', // Increased font size
              formatter: val => `${val}%`,
              color: 'var(--mui-palette-text-primary)'
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1309,
        options: {
          plotOptions: {
            pie: {
              offsetY: 30 // Adjusted offset
            }
          }
        }
      },
      {
        breakpoint: 900,
        options: {
          plotOptions: {
            pie: {
              offsetY: 20 // Adjusted offset
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: {
            height: 250 // Increased chart height
          }
        }
      }
    ]
  }

  return (
    <Card className='bs-full'>
      <CardContent className='pbe-0'>
        <Typography variant='subtitle1'>Total Growth</Typography>
        <AppReactApexCharts type='donut' height={250} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default DonutChart