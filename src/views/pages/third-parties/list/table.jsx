'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'

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
import { rankItem } from '@tanstack/match-sorter-utils'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'
import Image from 'next/image'
import Link from '@/components/Link'
import { getThirdParties } from '@/libs/api/third-parties'

// Column Definitions
const columnHelper = createColumnHelper()

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// A debounced input react component
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} size='small' value={value} onChange={e => setValue(e.target.value)} />
}

const Filter = ({ column, table }) => {
  // Vars
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className='flex gap-x-2'>
      <TextField
        fullWidth
        type='number'
        size='small'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={columnFilterValue?.[0] ?? ''}
        onChange={e => column.setFilterValue(old => [e.target.value, old?.[1]])}
        placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
      />
      <TextField
        fullWidth
        type='number'
        size='small'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={columnFilterValue?.[1] ?? ''}
        onChange={e => column.setFilterValue(old => [old?.[0], e.target.value])}
        placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
      />
    </div>
  ) : (
    <TextField
      fullWidth
      size='small'
      sx={{ minInlineSize: 100 }}
      value={columnFilterValue ?? ''}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder='Search...'
    />
  )
}

const ThirdPartiesTable = () => {
  // States
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const [data, setData] = useState([])

  // Hooks
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Technical ID',
        size: 100
      }),
      columnHelper.accessor('name', {
        cell: info => (
          <Link href={'/third-parties/' + info.row.original.id} className='text-primary'>
            {info.getValue()}
          </Link>
        ),
        header: 'Third-party Name'
      }),
      columnHelper.accessor('name_alias', {
        cell: info => info.getValue(),
        header: 'Alias Name'
      }),
      columnHelper.accessor('barcode', {
        cell: info => info.getValue(),
        header: 'Barcode'
      }),
      columnHelper.accessor('code_client', {
        cell: info => info.getValue(),
        header: 'Customer Code'
      }),
      columnHelper.accessor('code_fournisseur', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Vendor code</div>,
        size: 120
      }),
      columnHelper.accessor('accountancy_code_customer', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Cust. account. code</div>,
        size: 120
      }),
      columnHelper.accessor('accountancy_code_supplier', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Sup. account. code</div>,
        size: 120
      }),
      columnHelper.accessor('address', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Address</div>,
        size: 200
      }),
      columnHelper.accessor('salesRepresentatives', {
        cell: info => info.getValue(),
        header: 'Sales representatives'
      }),
      columnHelper.accessor('zipcode', {
        cell: info => info.getValue(),
        header: 'Zip Code'
      }),
      columnHelper.accessor('town', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>City</div>,
        size: 120
      }),
      columnHelper.accessor('state_id', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>State/Province</div>,
        size: 120
      }),
      columnHelper.accessor('region', {
        cell: info => info.getValue(),
        header: () => <div className='text-center'>Region</div>,
        size: 120
      }),
      columnHelper.accessor('typent_id', {
        cell: info => info.getValue(),
        header: 'Third-party type'
      }),
      columnHelper.accessor('workforce', {
        cell: info => info.getValue(),
        header: 'Workforce'
      }),
      columnHelper.accessor('phone', {
        cell: info => info.getValue(),
        header: 'Phone'
      }),
      columnHelper.accessor('fax', {
        cell: info => info.getValue(),
        header: 'Fax'
      }),
      columnHelper.accessor('idprof1', {
        cell: info => info.getValue(),
        header: '	Prof. id 1'
      }),
      columnHelper.accessor('idprof2', {
        cell: info => info.getValue(),
        header: '	Prof. id 2'
      }),
      columnHelper.accessor('idprof3', {
        cell: info => info.getValue(),
        header: '	Prof. id 3'
      }),
      columnHelper.accessor('idprof4', {
        cell: info => info.getValue(),
        header: '	Prof. id 4'
      }),
      columnHelper.accessor('idprof5', {
        cell: info => info.getValue(),
        header: '	Prof. id 5'
      }),
      columnHelper.accessor('idprof6', {
        cell: info => info.getValue(),
        header: '	Prof. id 6'
      }),
      columnHelper.accessor('vat_id', {
        cell: info => info.getValue(),
        header: 'VAT ID'
      }),
      columnHelper.accessor('natureOfThirdParty', {
        cell: info => info.getValue(),
        header: 'Nature of Third Party'
      }),
      columnHelper.accessor('potential', {
        cell: info => info.getValue(),
        header: 'Prospect potential',
        size: 150
      }),
      columnHelper.accessor('status_prospect_label', {
        cell: info => info.getValue(),
        header: 'Prospect status',
        size: 150
      }),
      columnHelper.accessor('"parent"', {
        cell: info => info.getValue(),
        header: 'Parent company'
      }),
      columnHelper.accessor('weight', {
        cell: info => info.getValue(),
        header: 'Weight'
      }),
      columnHelper.accessor('linkedObjectsIds', {
        cell: info => info.getValue(),
        header: 'Birth date'
      }),
      columnHelper.accessor('date_creation', {
        cell: info => {
          const date = new Date(info.getValue())
          return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        },
        header: 'Creation Date',
        size: 260
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
        cell: info => info.getValue(),
        header: 'Status'
      }),
      columnHelper.accessor('import_key', {
        cell: info => info.getValue(),
        header: 'Import id'
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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
      const result = await getThirdParties({ limit: table.pageSize, page: table.pageIndex })

      setData(result.data)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  useEffect(() => {
    fetchData()
  }, [table.pageSize, table.pageIndex])

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
                          {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })}
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

export default ThirdPartiesTable
