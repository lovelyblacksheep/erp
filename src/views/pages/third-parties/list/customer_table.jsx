'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
import { getThirdParties } from '@/libs/api/third-parties'

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

const DateRangeFilter = ({ column }) => {
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

  useEffect(() => {
    column.setFilterValue({ from: fromDate, to: toDate })
  }, [fromDate, toDate, column])

  return (
    <div className='flex gap-x-2'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='From'
          value={fromDate}
          onChange={newValue => setFromDate(newValue)}
          renderInput={params => <TextField {...params} size='small' />}
          PopperProps={{
            placement: 'bottom-start'
          }}
        />
        <DatePicker
          label='To'
          value={toDate}
          onChange={newValue => setToDate(newValue)}
          renderInput={params => <TextField {...params} size='small' />}
          PopperProps={{
            placement: 'bottom-start'
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

const Filter = ({ column, table }) => {
  const columnFilterValue = column.getFilterValue()

  if (['country_id', 'Third-party_type', 'fk_prospectlevel', 'status_prospect_label', 'status'].includes(column.id)) {
    return <DropdownFilter column={column} options={['Option 1', 'Option 2', 'Option 3']} /> // Replace with actual options
  } else if (column.id === 'date_modification') {
    return <DateRangeFilter column={column} />
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

const Customer_Table = ({ onSelectionChange }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Technical ID',
        size: 100
      }),
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
      columnHelper.accessor('address', {
        header: 'Address',
        size: 200
      }),
      columnHelper.accessor('sales_representatives', {
        header: 'Sales representatives',
        size: 180
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
      columnHelper.accessor('Third-party_type', {
        header: 'Third-party type',
        size: 150
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        size: 200
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        size: 120
      }),
      columnHelper.accessor('fk_prospectlevel', {
        header: 'Prospect potential',
        size: 150
      }),
      columnHelper.accessor('status_prospect_label', {
        cell: info => (
          <Select
            value={info.getValue()}
            onChange={async e => {
              const newValue = e.target.value
              info.row.original.status_prospect_label = newValue
              try {
                await axios.put(
                  `https://qnerp.com/erp/api/index.php/thirdparties/${info.row.original.id}/representatives`,
                  {
                    status_prospect_label: newValue
                  },
                  {
                    params: { DOLAPIKEY: 'your_api_key_here' }
                  }
                )
              } catch (error) {
                console.error('Error updating prospect status:', error)
              }
            }}
          >
            <MenuItem value='Do not contact'>Do not contact</MenuItem>
            <MenuItem value='Never contacted'>Never contacted</MenuItem>
            <MenuItem value='To be contacted'>To be contacted</MenuItem>
            <MenuItem value='Contact in process'>Contact in process</MenuItem>
            <MenuItem value='Contact done'>Contact done</MenuItem>
          </Select>
        ),
        header: 'Prospect status',
        size: 150
      }),
      columnHelper.accessor('height', {
        header: 'Height',
        size: 100
      }),
      columnHelper.accessor('weight', {
        header: 'Weight',
        size: 100
      }),
      columnHelper.accessor('profession', {
        header: 'Profession',
        size: 150
      }),
      columnHelper.accessor('date_modification', {
        cell: info => {
          const date = new Date(info.getValue() * 1000)
          return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        },
        header: 'Modif. date',
        size: 180
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        size: 100
      }),
      columnHelper.accessor('import_key', {
        header: 'Import id',
        size: 120
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
      const enhancedData = await Promise.all(
        result.data.map(async item => {
          const repResponse = await axios.get(
            `https://qnerp.com/erp/api/index.php/thirdparties/${item.id}/representatives`,
            {
              params: { DOLAPIKEY: 'your_api_key_here' }
            }
          )
          return {
            ...item,
            sales_representatives: repResponse.data.map(rep => rep.lastname).join(', ')
          }
        })
      )
      setData(enhancedData)
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
        <table className={`${styles.table} w-full`} style={{ minWidth: '2000px' }}>
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

export default Customer_Table
