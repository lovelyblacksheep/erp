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

const CountryFilter = ({ column }) => {
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
      <MenuItem value='US'>United States</MenuItem>
      <MenuItem value='CA'>Canada</MenuItem>
      <MenuItem value='GB'>United Kingdom</MenuItem>
      {/* Add more countries as needed */}
    </Select>
  )
}

const StatusFilter = ({ column }) => {
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
      <MenuItem value='Active'>Active</MenuItem>
      <MenuItem value='Inactive'>Inactive</MenuItem>
    </Select>
  )
}

const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()

  if (column.id === 'country_id') {
    return <CountryFilter column={column} />
  } else if (column.id === 'status') {
    return <StatusFilter column={column} />
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

const Vendors_Table = ({ onSelectionChange }) => {
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
          <Link href={`/prospects/${info.row.original.id}`} className={styles.link}>
            {info.getValue()}
          </Link>
        ),
        header: () => <div className='text-center'>Third-party name</div>,
        size: 150
      }),
      columnHelper.accessor('name_alias', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Alias Name</div>,
        size: 150
      }),
      columnHelper.accessor('code_fournisseur', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Vendor code</div>,
        size: 120
      }),
      columnHelper.accessor('zip', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Zip Code</div>,
        size: 120
      }),
      columnHelper.accessor('town', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>City</div>,
        size: 120
      }),
      columnHelper.accessor('country_id', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Country</div>,
        size: 150
      }),
      columnHelper.accessor('phone', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Phone</div>,
        size: 150
      }),
      columnHelper.accessor('status', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Status</div>,
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
        sortfield: 't.rowid',
        sortorder: 'ASC',
        limit: 100,
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
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={classnames('whitespace-nowrap', styles.header)}>
                    {header.isPlaceholder ? null : (
                      <div className='flex flex-col items-center'>
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                        {header.column.getCanFilter() && (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className={classnames({ [styles.selectedRow]: row.getIsSelected() })}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='text-center'>
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
        count={table.getPrePaginationRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={page => table.setPageIndex(page)}
        onRowsPerPageChange={event => table.setPageSize(Number(event.target.value))}
      />
    </Card>
  )
}

export default Vendors_Table
