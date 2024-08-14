'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'

// Column Definitions
const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('contact', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor('date', {
    cell: info => info.getValue()
  })
]

const LatestMO = () => {
  // States

  const [data, setData] = useState(() => [
    {
      contact: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> Max Martinez Pachas
        </div>
      ),
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> !SK Josepha
        </div>
      ),
      date: '08/13/2024'
    },
    {
      contact: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> Max Martinez Pachas
        </div>
      ),
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> !SK Josepha
        </div>
      ),
      date: '08/13/2024'
    },
    {
      contact: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> Max Martinez Pachas
        </div>
      ),
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> !SK Josepha
        </div>
      ),
      date: '08/13/2024'
    }
  ])

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
              .rows.slice(0, 10)
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
