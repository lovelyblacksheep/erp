'use client'

import React from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MailIcon from '@mui/icons-material/Mail'
import DeleteIcon from '@mui/icons-material/Delete'
import Label from '@mui/icons-material/Label'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import InfoIcon from '@mui/icons-material/Info'
import ForumIcon from '@mui/icons-material/Forum'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchIcon from '@mui/icons-material/Search'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition
} from '@mui/x-tree-view/TreeItem2'
import { unstable_useTreeItem2 as useTreeItem } from '@mui/x-tree-view/useTreeItem2'
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider'
import { Grid, Paper, TextField, Button, Chip } from '@mui/material'
import { getThirdPartyCategories } from '@/libs/api/third-parties'
import { Add } from '@mui/icons-material'
import Link from '@/components/Link'

// Helper function to determine if a color is light or dark
const isLightColor = color => {
  const hex = color.replace('#', '')
  const c_r = parseInt(hex.substr(0, 2), 16)
  const c_g = parseInt(hex.substr(2, 2), 16)
  const c_b = parseInt(hex.substr(4, 2), 16)
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000
  return brightness > 155
}

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(1, 0),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: -24,
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: alpha(theme.palette.primary.main, 0.4)
  },
  '&:last-child::before': {
    height: '50%'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: -24,
    top: '50%',
    width: 24,
    height: 2,
    backgroundColor: alpha(theme.palette.primary.main, 0.4)
  }
}))

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme, bgcolor }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: bgcolor,
  display: 'inline-flex',
  alignItems: 'center',
  width: 'auto',
  '&:hover': {
    backgroundColor: bgcolor
  },
  '&.focused, &.selected, &.selected.focused': {
    backgroundColor: bgcolor
  }
}))

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({ theme }) => ({
  marginRight: theme.spacing(2)
}))

const ActionBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center'
}))

const getColor = (c) => {
    if(c[0] === '#') {
        return c;
    }
    else
    {
        return `#${c}`;
    }
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const theme = useTheme()
  const { itemId, label, color, children, ...other } = props

  const { getRootProps, getContentProps, getIconContainerProps, getLabelProps, getGroupTransitionProps, status } =
    useTreeItem({ itemId, children, label, rootRef: ref })

    console.log("COLOR :: ", color)
  const backgroundColor = color ? getColor(color) : '#6e6e6e'
  const isLight = isLightColor(backgroundColor)
  const textColor = isLight ? 'black' : 'white'

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other })}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <CustomTreeItemContent
            {...getContentProps({
              className: status.expanded ? 'expanded' : ''
            })}
            bgcolor={backgroundColor}
          >
            <CustomTreeItemIconContainer {...getIconContainerProps()}>
              <LocalOfferIcon sx={{ color: textColor }} />
            </CustomTreeItemIconContainer>
            <Typography {...getLabelProps()} sx={{ fontSize: '1.1rem', fontWeight: 500, color: textColor }}>
              {label}
            </Typography>
          </CustomTreeItemContent>
          <ActionBox>
            <VisibilityIcon sx={{ mr: 1.5, fontSize: '1.5rem', color: theme.palette.text.secondary }} />
            <EditIcon sx={{ mr: 1.5, fontSize: '1.5rem', color: theme.palette.text.secondary }} />
            <DeleteIcon sx={{ fontSize: '1.5rem', color: theme.palette.text.secondary }} />
          </ActionBox>
        </Box>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()}>{children}</TreeItem2GroupTransition>}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  )
})

const CategoriesTreeView = ({ items }) => {
  return (
    <SimpleTreeView
      aria-label='categories'
      defaultExpandedItems={['3']}
      defaultSelectedItems='5'
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon
      }}
      sx={{ flexGrow: 1, maxWidth: '100%', overflowY: 'auto', pl: 3 }}
    >
      {items.map(item => (
        <CustomTreeItem key={item.id} itemId={item.id.toString()} label={item.label} color={item.color}>
          {item.childs &&
            item.childs.map(child => (
              <CustomTreeItem key={child.id} itemId={child.id.toString()} label={child.label} color={child.color} />
            ))}
        </CustomTreeItem>
      ))}
    </SimpleTreeView>
  )
}

export default function Categories() {
  const [items, setItems] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const fetchItems = async () => {
      let response = await getThirdPartyCategories()
      if (response && response.status === 200) {
        setItems(convertItems(response.data))
      }
    }
    fetchItems()
  }, [])

  const convertItems = data => {
    const itemsById = data.reduce((acc, item) => {
      acc[item.id] = {
        ...item,
        childs: []
      }
      return acc
    }, {})

    const rootItems = []

    data.forEach(item => {
      const newItem = itemsById[item.id]

      if (item.fk_parent) {
        itemsById[item.fk_parent].childs.push(newItem)
      } else {
        rootItems.push(newItem)
      }
    })

    return rootItems
  }

  const handleSearch = () => {
    console.log('Searching for:', searchTerm)
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant='h6' gutterBottom>
          Contact tags/categories area
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            placeholder='Search by name...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant='contained' color='primary' style={{marginRight: 8}} onClick={handleSearch} startIcon={<SearchIcon />}>
            Search
          </Button>
          <Button variant='contained' color='primary' LinkComponent={Link} href='categories/add' startIcon={<Add />}>
            Add
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h6'>Tags/categories</Typography>
          <Box>
            <Button size='small' sx={{ mr: 1 }}>
              Undo expand
            </Button>
            <Button size='small'>Expand all</Button>
          </Box>
        </Box>
        <CategoriesTreeView items={items} />
      </Paper>
    </Box>
  )
}
