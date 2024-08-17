'use client'

// Next Imports
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import Link from 'next/link'

// Column Definitions
const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor('action', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor('date', {
    cell: info => info.getValue()
  })
]

const LatestThirdParties = () => {
  // States
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/thirdparties`, {
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
            DOLAPIKEY: apiKey
          }
        })

        const transformedData = response.data.map(item => ({
          name: (
            <Link href='/' className='flex items-center gap-2 text-primary hover:underline'>
              <i className='ri-building-4-fill' /> {item.name}
            </Link>
          ),
          action: (
            <div className='flex items-center gap-2'>
              <Link href='/' className='bg-green-300 w-5 h-5 text-white text-center rounded-sm block text-sm'>
                P
              </Link>
              <Link href='/' className='bg-green-500 w-5 h-5 text-white text-center rounded-sm block text-sm'>
                C
              </Link>
            </div>
          ),
          date: new Date(item.date_modification * 1000).toLocaleDateString('en-GB')
        }))

        setData(transformedData.slice(0, 3)) // Display only the latest 3 modified third parties
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  return (
    <Card>
      <CardHeader title='The latest 3 modified Third Parties' />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default LatestThirdParties
