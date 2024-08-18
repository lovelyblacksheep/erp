'use client'

// React Imports
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

// Column Definitions
const columnHelper = createColumnHelper()

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounced Input
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

const ProspectStatusFilter = ({ column, table }) => {
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
      <MenuItem value='Do not contact'>Do not contact</MenuItem>
      <MenuItem value='Never contacted'>Never contacted</MenuItem>
      <MenuItem value='To be contacted'>To be contacted</MenuItem>
      <MenuItem value='Contact in process'>Contact in process</MenuItem>
      <MenuItem value='Contact done'>Contact done</MenuItem>
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
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue()

  if (column.id === 'status_prospect_label') {
    return <ProspectStatusFilter column={column} table={table} />
  } else if (column.id === 'birth_date') {
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

const Prospects_Table = ({ onSelectionChange }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const columns = useMemo(
    () => [
      columnHelper.accessor('select', {
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 50
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
        cell: info => info.getValue(),
        header: 'Alias Name',
        size: 120
      }),
      columnHelper.accessor('sales_representatives', {
        cell: info => info.getValue(),
        header: 'Sales representatives',
        size: 180
      }),
      columnHelper.accessor('zip', {
        cell: info => info.getValue(),
        header: 'Zip Code',
        size: 80
      }),
      columnHelper.accessor('fk_prospectlevel', {
        cell: info => info.getValue(),
        header: 'Prospect potential',
        size: 120
      }),
      columnHelper.accessor('status_prospect_label', {
        cell: info => (
          <Select
            value={info.getValue()}
            onChange={async e => {
              const newValue = e.target.value
              info.row.original.status_prospect_label = newValue
              try {
                await fetch(`https://qnerp.com/erp/api/index.php/thirdparties/${info.row.original.id}`, {
                  method: 'PUT',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    DOLAPIKEY: 'cDIoWFiQIAB0'
                  },
                  body: JSON.stringify({ status_prospect_label: newValue })
                })
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
      columnHelper.accessor('profession', {
        cell: info => info.getValue(),
        header: 'Profession',
        size: 120
      }),
      columnHelper.accessor('birth_date', {
        cell: info => {
          const date = new Date(info.getValue() * 1000) // Convert Unix timestamp to milliseconds
          return date.toLocaleDateString('en-GB')
        },
        header: 'Birth date',
        size: 100
      }),
      columnHelper.accessor('status', {
        cell: info => info.getValue(),
        header: 'Status',
        size: 80
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
        mode: 2
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
          {table.getRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
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
          )}
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[7, 10, 25, { label: 'All', value: data.length }]}
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

export default Prospects_Table
