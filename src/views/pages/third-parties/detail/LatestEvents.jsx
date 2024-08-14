'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import classnames from 'classnames'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import Image from 'next/image'
import ChevronRight from '@/@menu/svg/ChevronRight'

// Column Definitions
const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('ref', {
    cell: info => info.getValue(),
    header: 'Ref.'
  }),
  columnHelper.accessor('by', {
    cell: info => info.getValue(),
    header: 'By'
  }),
  columnHelper.accessor('type', {
    cell: info => info.getValue(),
    header: 'Type'
  }),
  columnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'Title'
  }),
  columnHelper.accessor('date', {
    cell: info => info.getValue(),
    header: 'Date'
  })
]

const LatestEvents = () => {
  // States

  const [data, setData] = useState(() => [
    {
      ref: 1,
      by: (
        <div className='flex items-center gap-2'>
          <Image src='/images/avatars/1.png' alt='' width={28} height={28} className='w-7 h-7 rounded-full' />{' '}
          SuperAdmin
        </div>
      ),
      type: (
        <div className='flex items-center gap-2'>
          <i class='bx bxs-cog text-gray-500 text-xl'></i>

          <span>Events inserted automatically</span>
        </div>
      ),
      title: (
        <div className='flex items-center gap-2'>
          <i class='bx bxs-cog text-primary text-xl'></i>

          <span>تم إنشاء الطرف الثالث TakePOS عام العميل</span>
        </div>
      ),
      date: '07/21/2024 07:19 AM'
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
      <CardHeader title='Latest 10 linked events' />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
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

export default LatestEvents
