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
import Link from '@/components/Link'

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

  const [data, setData] = useState(() => [
    {
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> 04147096335
        </div>
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
      date: '08/13/2024'
    },
    {
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> 04147096335
        </div>
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
      date: '08/13/2024'
    },
    {
      name: (
        <div className='flex items-center gap-2'>
          <i className='ri-building-4-fill text-primary' /> 04147096335
        </div>
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
      <CardHeader title='The latest 3 modified Third Parties' />
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

export default LatestThirdParties
