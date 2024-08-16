'use client'

//Next Imports
import { apiKey, apiUrl } from '@/config'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import axios from 'axios'

// Style Imports
import styles from '@core/styles/table.module.css'

// Column Definitions
const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('ref', {
    header: 'Reference',
    cell: info => (
      <a href='#' className='text-blue-500 hover:underline'>
        {info.getValue()}
      </a>
    )
  }),
  columnHelper.accessor('date_modification', {
    header: 'Modification Date',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('tms', {
    header: 'Timestamp',
    cell: info => info.getValue()
  })
]

const LatestMO = () => {
  // State
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchMos = async () => {
      try {
        const result = await axios.get(`${apiUrl}/mos`, {
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
            DOLAPIKEY: apiKey
          }
        })

        const formattedData = result.data.map(item => ({
          ref: item.ref,
          date_modification: item.date_modification,
          tms: new Date(item.tms * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        }))

        setData(formattedData)
      } catch (error) {
        console.error('Error fetching MO data:', error)
      }
    }

    fetchMos()
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
      <CardHeader title='Latest 3 Manufacturing Orders modified' />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 3) // Display only the latest 3 items
              .map(row => (
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

export default LatestMO
