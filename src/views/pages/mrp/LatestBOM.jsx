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

// API Configs
// const apiUrl = 'https://qnerp.com/erp/api/index.php'
// const apiKey = 'cDIoWFiQIAB0'

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

const LatestBOM = () => {
  // State
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchBoms = async () => {
      try {
        const result = await axios.get(`${apiUrl}/boms`, {
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
        console.error('Error fetching BOM data:', error)
      }
    }

    fetchBoms()
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
      <CardHeader title='Latest 3 Bills of materials modified' />
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

export default LatestBOM
