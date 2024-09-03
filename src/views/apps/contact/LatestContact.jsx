'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Axios for API Calls
import axios from 'axios'
import { apiKey, apiUrl } from '@/config'

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
  }, [value, onChange, debounce])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Column Definitions
const columnHelper = createColumnHelper()

const LatestContactTable = () => {
  // States
  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
        columnHelper.accessor('name', {
        cell: info => info.getValue()
        }),
        columnHelper.accessor('action', {
        cell: info => info.getValue()
        }),
        columnHelper.accessor('date', {
        cell: info => info.getValue()
        }),
    //   columnHelper.accessor('ref', {
    //     header: 'Reference',
    //     cell: ({ row }) => {
    //         return (
    //             <Typography
    //               component={Link}
    //               href={getLocalizedUrl(`/apps/contact/${row.id}/third-party`, locale)}
    //               color='primary'
    //             >{`${row.original.ref}`}</Typography>
    //           )
    //     }
    //   }),
    //   columnHelper.accessor('date_modification', {
    //     header: 'Modification Date',
    //     cell: ({ getValue }) => <Typography>{getValue()}</Typography>
    //   }),
    //   columnHelper.accessor('tms', {
    //     header: 'Timestamp',
    //     cell: ({ getValue }) => <Typography>{getValue()}</Typography>
    //   })
    ],
    [locale]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    const fetchTps = async () => {
      try {
        const response = await axios.get(`${apiUrl}/contacts`, {
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
            DOLAPIKEY: apiKey
          }
        })

        const transformedData = response.data.map(item => ({
            name: (
              // <Link href={`third-parties/${item.id}/third-party`} className='flex items-center gap-2 text-primary hover:underline'>
              //   <i className='ri-building-4-fill' /> {item.name}
              // </Link>
              <Link href={''/*`contacts/${item.id}`*/} className='flex items-center gap-2 text-primary hover:underline'>
              <i className='ri-user-3-fill' /> {`${item.firstname} ${item.lastname}`}
            </Link>
            ),
            action: (
              <div className='flex items-center gap-2'>
                <Link href={/*'/'*/''} className='bg-green-300 w-5 h-5 text-white text-center rounded-sm block text-sm'>
                  P
                </Link>
                <Link href={/*'/'*/''} className='bg-green-500 w-5 h-5 text-white text-center rounded-sm block text-sm'>
                  C
                </Link>
              </div>
            ),
            date: new Date(item.date_modification * 1000).toLocaleDateString('en-GB')
          }))
  
          setData(transformedData.slice(0, 3)); // Display only the latest 3 modified third parties
          setFilteredData(transformedData.slice(0, 3));
        } catch (error) {
        console.error('Error fetching BOM data:', error)
      }
    }

    fetchTps()
  }, [])

  useEffect(() => {
    const filteredData = data?.filter(invoice => {
      if (status && invoice.status?.toLowerCase().replace(/\s+/g, '-') !== status) return false
      return true
    })

    setFilteredData(filteredData)
  }, [status, data])

  return (
    <Card>
      <CardHeader title="Latest 3 modified Contact" />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='ri-arrow-up-s-line text-xl' />,
                          desc: <i className='ri-arrow-down-s-line text-xl' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
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
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Card>
  )
}

export default LatestContactTable