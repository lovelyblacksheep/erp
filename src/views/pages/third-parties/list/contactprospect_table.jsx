'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import { getThirdParties } from '@/libs/api/third-parties'

// Column Definitions
const columnHelper = createColumnHelper()

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

const ContactsProspectTable = ({ onSelectionChange }) => {
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
      columnHelper.accessor('lastname', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Last Name</div>,
        size: 150
      }),
      columnHelper.accessor('firstname', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>First Name</div>,
        size: 150
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
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Email</div>,
        size: 150
      }),
      columnHelper.accessor('name', {
        cell: info => (
          <Link href={'/third-parties/' + info.row.original.id} className='text-primary'>
            {info.getValue()}
          </Link>
        ),
        header: 'Third-party Name'
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
    state: { columnFilters, globalFilter, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
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

export default ContactsProspectTable
