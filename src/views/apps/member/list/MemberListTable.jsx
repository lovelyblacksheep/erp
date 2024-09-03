'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'

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
import TableFilters from './TableFilters'
import AddUserDrawer from './AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getBoms } from '@/libs/api/bom'
import { getMos } from '@/libs/api/mo'

// Styled Components
const Icon = styled('i')({})

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
  }, [value, onChange, debounce])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

const userStatusObj = {
  '1': 'success',
  '0': 'secondary'
}

const columnHelper = createColumnHelper()

const UserListTable = ({ tableData }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const [mos, setMos] = useState([])
  const [boms, setBoms] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isShowingBoms, setIsShowingBoms] = useState(true)

  const fetchData = async () => {
    try {
      const bomsResult = await getBoms({ limit: 10, page: 0 })
      const mosResult = await getMos({ limit: 10, page: 0 })
      setBoms(bomsResult.data)
      setMos(mosResult.data)
      setData(bomsResult.data) // Default to Boms data
      setFilteredData(bomsResult.data) // Default to Boms data
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  const { lang: locale } = useParams()

  useEffect(() => {
    fetchData()
  }, [])

  const handleToggleData = () => {
    if (isShowingBoms) {
      setData(mos)
      setFilteredData(mos)
    } else {
      setData(boms)
      setFilteredData(boms)
    }
    setIsShowingBoms(!isShowingBoms)
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('ref', {
        header: 'Ref',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {/* {getAvatar({ avatar: row.original.avatar, fullName: row.original.fullName })} */}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.ref}
              </Typography>
              {/* <Typography variant='body2'>{row.original.username}</Typography> */}
            </div>
          </div>
        )
      }),
      columnHelper.accessor('label', {
        header: 'Label',
        cell: ({ row }) => <Typography>{row.original.label}</Typography>
      }),
      columnHelper.accessor('qty', {
        header: 'Quantity',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {/* <Icon
              className={classnames('text-[22px]', userRoleObj[row.original.role].icon)}
              sx={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
            /> */}
            <Typography className='capitalize' color='text.primary'>
              {row.original.qty}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('note_public', {
        header: 'Note',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.note_public}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row, getValue }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              color={userStatusObj[`${getValue()}`]}
              size='small'
              label={`${getValue()}` === '1' ? 'Active' : 'Not active'}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton size='small' onClick={() => setData(data?.filter(product => product.id !== row.original.id))}>
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
            <IconButton size='small'>
              <Link href={getLocalizedUrl(`/apps/member/${isShowingBoms ? 'bom' : 'mo'}/`+row.original.id, locale)} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'ri-download-line'
                },
                {
                  text: 'Edit',
                  icon: 'ri-edit-box-line'
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data, filteredData]
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

  const getAvatar = ({ avatar, fullName }) => {
    return avatar ? (
      <CustomAvatar src={avatar} skin='light' size={34} />
    ) : (
      <CustomAvatar skin='light' size={34}>
        {getInitials(fullName || "")}
      </CustomAvatar>
    )
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
        <Divider />
        <div className='flex justify-between gap-4 p-6'>
          <Typography variant='h6'>
            Showing {isShowingBoms ? 'Bill Of Materials' : 'Manufacturing Orders'}
          </Typography>
          <Button variant='contained' onClick={handleToggleData}>
            Switch to {isShowingBoms ? 'Mos' : 'Boms'}
          </Button>
        </div>
        <div className='overflow-auto'>
          <div className={classnames('table-container', tableStyles.mainTable)}>
            <table className={classnames('table', tableStyles.table)}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <TablePagination
          component='div'
          count={data?.length || 0}
          page={table.getState().pagination.pageIndex}
          rowsPerPage={table.getState().pagination.pageSize}
          onPageChange={(e, page) => table.setPageIndex(page)}
          onRowsPerPageChange={e => table.setPageSize(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>
    </>
  )
}

export default UserListTable