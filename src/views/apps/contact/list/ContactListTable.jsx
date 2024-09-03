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
import { getThirdParties } from '@/libs/api/third-parties'

// Styled Components
const Icon = styled('i')({})

// Fuzzy Filter Function
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounced Input Component
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

// User Role and Status Configurations
const userRoleObj = {
  admin: { icon: 'ri-vip-crown-line', color: 'error' },
  author: { icon: 'ri-computer-line', color: 'warning' },
  editor: { icon: 'ri-edit-box-line', color: 'info' },
  maintainer: { icon: 'ri-pie-chart-2-line', color: 'success' },
  subscriber: { icon: 'ri-user-3-line', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary',
  '0': 'secondary',
  '1': 'success',
  '9': 'warning'
}

// Column Definitions
const columnHelper = createColumnHelper()

const ContactListTable = ({type}) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  // Fetch Data Function
  const fetchData = async (pageSize, pageIndex) => {
    try {
      const result = await getThirdParties({ limit: pageSize, page: pageIndex })
      setData(result.data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  // useParams Hook to get locale
  const { lang: locale } = useParams()

  // Fetch data on component mount
  useEffect(() => {
    fetchData(10, 0)
  }, [])

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(fullName)}
        </CustomAvatar>
      )
    }
  }

  // const getModifyLink = id => {
  //   return href={getLocalizedUrl('/apps/contact/'+row.original.id, locale)};
  // }

  // Table Columns
  const columns = useMemo(
    () => [
      {
        id: 'select',
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
        )
      },
      columnHelper.accessor('name', {
        header: 'Third-party',
        cell: ({ row }) => {
          return (
            <div className='flex items-center gap-3'>
              {getAvatar({ avatar: row.original.logo, fullName: row.original.name })}
              <div className='flex flex-col'>
                <Typography component={Link} href={getLocalizedUrl('/apps/contact/'+row.original.id, locale)} color='text.primary' className='font-medium'>
                  {row.original.name}
                </Typography>
                <Typography variant='body2'>{row.original.country_code}</Typography>
              </div>
            </div>
          )
        }
      }),
      // columnHelper.accessor('name_alias', {
      //   header: 'Alias name',
      //   cell: ({ row }) => <Typography>{row.original.name_alias}</Typography>
      // }),
      columnHelper.accessor('code_client', {
        header: 'Customer code',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.code_client}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('code_fournisseur', {
        header: 'Vendor code',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.code_fournisseur}
          </Typography>
        )
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.address}
          </Typography>
        )
      }),
      columnHelper.accessor('date_creation', {
        header: 'Creation date',
        cell: info => {
          const date = new Date(info.getValue()*1000)
          return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={`${row.original.status}` === '1' ? "Active" : `${row.original.status}` === '0' ? "Not active" : `${row.original.status}` === '9' ? "Disabled" : "Unknwon"}
            size='small'
            color={userStatusObj[`${row.original.status}`]}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton
              size='small'
              onClick={() => setData(data.filter(user => user.id !== row.original.id))}
            >
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
            <IconButton size='small'>
              <Link href={getLocalizedUrl('/apps/contact/'+row.original.id, locale)} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconClassName='text-textSecondary'
              options={[
                { text: 'Edit', icon: 'ri-edit-box-line', href: getLocalizedUrl('/apps/contact/'+row.original.id+'/modify', locale) }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data, locale]
  )

  // Table Setup
  const table = useReactTable({
    data: filteredData.length ? filteredData : data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection: true
  })

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters typeObject={type} setData={setFilteredData} tableData={data} />
        <Divider />
        <div className='flex justify-between gap-4 p-5 flex-col items-start sm:flex-row sm:items-center'>
          <Button
            color='secondary'
            variant='outlined'
            startIcon={<i className='ri-upload-2-line' />}
            className='max-sm:is-full'
          >
            Export
          </Button>
          <div className='flex items-center gap-x-4 max-sm:gap-y-4 flex-col max-sm:is-full sm:flex-row'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Contacts'
              className='sm:min-w-[300px]'
            />
            <Button
              // onClick={() => setAddUserOpen(true)}
              component={Link}
              href={getLocalizedUrl('/apps/contact/'+'add', locale)}
              variant='contained'
              className='max-sm:is-full'
              startIcon={<i className='ri-user-add-line' />}
            >
              Add Contact
            </Button>
          </div>
        </div>
        <div className={`overflow-x-auto ${tableStyles.root}`}>
          <table className='table-auto' style={{width: '100%'}}>
            <thead className={tableStyles.tableHead}>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={tableStyles.tableRow}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='table-cell p-2'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={data.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, newPage) => table.setPageIndex(newPage)}
          onRowsPerPageChange={e => table.setPageSize(parseInt(e.target.value, 10))}
        />
      </Card>

      <AddUserDrawer open={addUserOpen} onClose={() => setAddUserOpen(false)} />
    </>
  )
}

export default ContactListTable