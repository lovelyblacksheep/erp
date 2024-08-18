'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'

// Icon Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

// API Import
import { getThirdParties } from '@/libs/api/thirdparty'

// Config Import
import { apiUrl, apiKey } from '@/config'

const columnHelper = createColumnHelper()

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <TextField {...props} size='small' value={value} onChange={e => setValue(e.target.value)} />
}

const DropdownFilter = ({ column, options }) => {
  const columnFilterValue = column.getFilterValue() ?? ''

  return (
    <Select
      fullWidth
      size='small'
      value={columnFilterValue}
      onChange={e => column.setFilterValue(e.target.value)}
      displayEmpty
    >
      <MenuItem value=''>All</MenuItem>
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}

const Filter = ({ column, table }) => {
  const columnFilterValue = column.getFilterValue()

  if (['country_id', 'status'].includes(column.id)) {
    return <DropdownFilter column={column} options={['Option 1', 'Option 2', 'Option 3']} /> // Replace with actual options
  } else if (column.id !== 'select') {
    return (
      <TextField
        fullWidth
        size='small'
        sx={{ minInlineSize: 80 }}
        value={columnFilterValue ?? ''}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder='Search...'
      />
    )
  }
  return null
}

const Vendor_Table = ({ onSelectionChange }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        cell: info => (
          <Link href={`/thirdparty/${info.row.original.id}`} className={`${styles.link} hover:underline`}>
            {info.getValue()}
          </Link>
        ),
        header: 'Third-party name',
        size: 150
      }),
      columnHelper.accessor('name_alias', {
        header: 'Alias Name',
        size: 120
      }),
      columnHelper.accessor('code_client', {
        header: 'Vendor Code',
        size: 120
      }),
      columnHelper.accessor('zip', {
        header: 'Zip Code',
        size: 100
      }),
      columnHelper.accessor('town', {
        header: 'City',
        size: 120
      }),
      columnHelper.accessor('country_id', {
        header: 'Country',
        size: 120
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        size: 120
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        size: 100,
        cell: info => (
          <Select
            value={info.getValue()}
            onChange={async e => {
              const newValue = e.target.value
              info.row.original.status = newValue
              try {
                await fetch(`${apiUrl}/thirdparties/${info.row.original.id}`, {
                  method: 'PUT',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    DOLAPIKEY: apiKey
                  },
                  body: JSON.stringify({ status: newValue })
                })
              } catch (error) {
                console.error('Error updating status:', error)
              }
            }}
          >
            <MenuItem value={0}>Draft</MenuItem>
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={2}>Suspended</MenuItem>
          </Select>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { columnFilters, globalFilter, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  async function fetchData() {
    try {
      const result = await getThirdParties({
        limit: table.getState().pagination.pageSize,
        page: table.getState().pagination.pageIndex,
        mode: 1
      })
      setData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [table.getState().pagination.pageSize, table.getState().pagination.pageIndex])

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows
    onSelectionChange(selectedRows.map(row => row.original))
  }, [rowSelection])

  return (
    <Card>
      <CardHeader
        className='flex flex-wrap gap-y-2'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        }
      />
      <div className='overflow-x-auto'>
        <table className={`${styles.table} w-full`}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='p-2' style={{ width: header.column.columnDef.size }}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames('flex flex-col items-center justify-center gap-1', {
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                        >
                          <div className='flex items-center' onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1rem' className='rotate-90' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter() && (
                            <div className='w-full'>
                              <Filter column={header.column} table={table} />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='text-center p-2' style={{ width: cell.column.columnDef.size }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component='div'
        className='border-bs'
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default Vendor_Table
