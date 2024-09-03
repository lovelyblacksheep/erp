"use client";

import * as React from 'react';
import clsx from 'clsx';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition,
} from '@mui/x-tree-view/TreeItem2';
import {
  unstable_useTreeItem2 as useTreeItem,
  UseTreeItem2Parameters,
} from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { Button, Card, CardHeader, Collapse, Grid, MenuItem, Paper, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/HorizontalRule';
import { Folder as FolderIcon, Search as SearchIcon, FileOpen as FileIcon, Add, Expand } from '@mui/icons-material';
import { ExpandLess as CollapseIcon } from '@mui/icons-material';
import { getThirdPartyCategories } from '@/libs/api/third-parties';
import Link from '@/components/Link';
import { deleteCategory } from '@/libs/api/category';
import LoadingSpinner from '@/components/Loading';

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'relative', // Ensure the pseudo-element is positioned relative to the tree item
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 10, // Position the line to the left of the content
    width: 1,
    backgroundColor: theme.palette.divider,  // theme.palette.divider
    zIndex: -1, // Ensure the line is behind the content
  },
}));

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 20, // Indent the children to match the vertical line
  }),
);

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.fontWeightRegular,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.focused, &.selected, &.selected.focused': {
    backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    color: 'var(--tree-view-color)',
  },
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

// const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
//   ({ theme }) => ({
//     marginLeft: 0,
//     [`& .content`]: {
//       paddingLeft: theme.spacing(2),
//     },
//   }),
// );

const UnderlinedTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  },
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props,
  ref,
) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    handleDelete,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const style = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode || color,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode || bgColor,
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 1,
              pr: 1,
            }}
          >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <UnderlinedTypography
              component={Link}
              href={`categories/${itemId}`}
              {...getLabelProps({
                variant: 'body2',
                color: color,
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
              })}
            />
            {/* <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography> */}
            <Grid width={"max-content"} height={"100%"} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"} gap={2}>
              <Link href={`categories/${itemId}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><VisibilityIcon /></Link>
              <Link href={`categories/edit/${itemId}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><EditIcon /></Link>
              <DeleteIcon onClick={handleDelete} />
            </Grid>
          </Box>
        </CustomTreeItemContent>
        {children && (
          <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
        )}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}

// function CategoriesTreeView() {
//   return (
//     <SimpleTreeView
//       aria-label="categories"
//       defaultExpandedItems={['3']}
//       defaultSelectedItems="5"
//       slots={{
//         expandIcon: AddIcon,
//         collapseIcon: MinusIcon,
//         endIcon: EndIcon,
//       }}
//       sx={{ flexGrow: 1, maxWidth: '100%', width: '100%' }}
//     >
//       <CustomTreeItem itemId="1" label="All Mail" labelIcon={FolderIcon} />
//       <CustomTreeItem itemId="2" label="Trash" labelIcon={FolderIcon} />
//       <CustomTreeItem itemId="3" label="Categories" labelIcon={FolderIcon}>
//         <CustomTreeItem
//           itemId="5"
//           label="Social"
//           labelIcon={SupervisorAccountIcon}
//           labelInfo="90"
//           color="#1a73e8"
//           bgColor="#e8f0fe"
//           colorForDarkMode="#B8E7FB"
//           bgColorForDarkMode={alpha('#00b4ff', 0.2)}
//         />
//         <CustomTreeItem
//           itemId="6"
//           label="Updates"
//           labelIcon={InfoIcon}
//           labelInfo="2,294"
//           color="#e3742f"
//           bgColor="#fcefe3"
//           colorForDarkMode="#FFE2B7"
//           bgColorForDarkMode={alpha('#ff8f00', 0.2)}
//         />
//         <CustomTreeItem
//           itemId="7"
//           label="Forums"
//           labelIcon={ForumIcon}
//           labelInfo="3,566"
//           color="#a250f5"
//           bgColor="#f3e8fd"
//           colorForDarkMode="#D9B8FB"
//           bgColorForDarkMode={alpha('#9035ff', 0.15)}
//         />
//         <CustomTreeItem
//           itemId="8"
//           label="Promotions"
//           labelIcon={LocalOfferIcon}
//           labelInfo="733"
//           color="#3c8039"
//           bgColor="#e6f4ea"
//           colorForDarkMode="#CCE8CD"
//           bgColorForDarkMode={alpha('#64ff6a', 0.2)}
//         />
//       </CustomTreeItem>
//       <CustomTreeItem itemId="4" label="History" labelIcon={FolderIcon} />
//     </SimpleTreeView>
//   );
// }

function CategoriesTreeView({ items, expandedItems, toggleExpand, onDelete }) {
  return (
    <SimpleTreeView
      aria-label="categories"
      defaultExpandedItems={[]}
      defaultSelectedItems=""
      expandedItems={expandedItems || []}
      onItemExpansionToggle={toggleExpand}
      slots={{
        expandIcon: AddIcon,
        collapseIcon: MinusIcon,
        endIcon: EndIcon,
      }}
      sx={{ flexGrow: 1, maxWidth: '100%', width: '100%' }}
    >
      {items.map((item) => {
        return (
          <CustomTreeItem handleDelete={onDelete(item)} key={item.id} labelIcon={(item.childs || []).length > 0 ? FolderIcon : FileIcon} itemId={item.id.toString()} label={item.label} color={item.color}>
            {item.childs && item.childs.map((child) => {
              return (
                <CustomTreeItem handleDelete={onDelete(item)}
                  key={child.id} labelIcon={(child.childs || []).length > 0 ? FolderIcon : FileIcon} itemId={child.id.toString()} label={child.label || "No label"} color={child.color}
                />
              );
            })}
          </CustomTreeItem>
        );
      })}
    </SimpleTreeView>
  );
}


export default function Categories() {

  const [items, setItems] = React.useState([])
  const [oItems, setOItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('')
  const [expandedItems, setExpandedItems] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItems = async () => {
      let response = await getThirdPartyCategories('customer')
      if (response && response.status === 200) {
        setLoading(false);
        setOItems(convertItems(response.data))
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

    let o = Object.keys(itemsById);

    data.forEach(item => {
      const newItem = itemsById[item.id]

      if (item.fk_parent !== null) {
        if (o.indexOf(item.fk_parent) < 0) {
          if (`${item.fk_parent}` === '0') {
            rootItems.push(newItem)
          }
        }
        else {
          itemsById[item.fk_parent].childs.push(newItem)
        }
      } else {
        rootItems.push(newItem)
      }
    })

    return rootItems
  }

  React.useEffect(() => {
    if (searchTerm && searchTerm.trim() && searchTerm.trim().length > 0) {
      let res = [];
      oItems.map((o) => {
        if ((o.label || "").trim() && (o.label || "").trim().length > 0) {
          if ((o.label || "").trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())) {
            res.push(o);
          }
        }
      });
      setItems(res);
    }
    else {
      setItems([...oItems]);
    }
  }, [oItems]);

  React.useEffect(() => {
    if (searchTerm && searchTerm.trim() && searchTerm.trim().length > 0) {
      let res = [];
      oItems.map((o) => {
        if ((o.label || "").trim() && (o.label || "").trim().length > 0) {
          if ((o.label || "").trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())) {
            res.push(o);
          }
        }
      });
      setItems(res);
    }
    else {
      setItems([...oItems]);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    if (searchTerm && searchTerm.trim() && searchTerm.trim().length > 0) {
      let res = [];
      oItems.map((o) => {
        if ((o.label || "").trim() && (o.label || "").trim().length > 0) {
          if ((o.label || "").trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())) {
            res.push(o);
          }
        }
      });
      setItems(res);
    }
  }

  const handleExpandAll = () => {
    let k = []
    items.map((i) => {
      k.push(i.id.toString());
    });
    setExpandedItems(k);
  }

  const handleCollapseAll = () => {
    setExpandedItems([]);
  }

  const handleToggleExpand = (e, i) => {
    let k = expandedItems.indexOf(i);
    if (k > -1) {
      let j = [...expandedItems];
      delete j[k];
      setExpandedItems(j);
    }
    else {
      setExpandedItems([
        ...expandedItems,
        i
      ])
    }
  }

  const handleDelete = async (item) => async (e) => {
    setLoading(true);
    await deleteCategory(item.id);
    setLoading(false);
  }

  // return (
  // <Grid width={'100%'}>
  //   <Grid width={'100%'} height={'auto'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4} marginBottom={4}>
      // <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={4}>
      //   <Typography variant='h6' whiteSpace={'nowrap'} gutterBottom>
      //     Customer tags/categories area
      //   </Typography>
      //   <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
      //     <TextField
      //       fullWidth
      //       variant='outlined'
      //       size='small'
      //       placeholder='Search by name...'
      //       value={searchTerm}
      //       onChange={e => setSearchTerm(e.target.value)}
      //       sx={{ mr: 1 }}
      //     />
      //     <Button
      //       variant='contained'
      //       color='primary'
      //       style={{ marginRight: 8 }}
      //       onClick={handleSearch}
      //       startIcon={<SearchIcon />}
      //     >
      //       Search
      //     </Button>
      //   </Box>
      // </Grid>
  //     <Grid>
  //     <Button
  //           variant='contained'
  //           color='primary'
  //           style={{ marginRight: 8, whiteSpace: 'nowrap' }}
  //           LinkComponent={Link} href='categories/add'
  //           startIcon={<AddIcon />}
  //         >
  //           Add category
  //         </Button>
  //     </Grid>
  //   </Grid>
  //   <Grid border={1} borderColor='grey.300' borderRadius={1} p={6}>

  //     {loading ? <LoadingSpinner /> : <>
  //       {/* <Box width={'100%'}>
  //         <CategoriesTreeView />
  //       </Box> */}
  //       {/* <Paper elevation={3} sx={{ p: 6 }}> */}
  //       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  //         <Typography variant='h6'>Tags/categories</Typography>
  //         <Box>
  //           <Button size='small' onClick={handleCollapseAll} sx={{ mr: 1 }}>
  //             Undo expand
  //           </Button>
  //           <Button size='small' onClick={handleExpandAll}>Expand all</Button>
  //         </Box>
  //       </Box>
  //       <CategoriesTreeView onDelete={handleDelete} toggleExpand={handleToggleExpand} expandedItems={expandedItems} items={items} />
  //     {/* </Paper> */}
  //     </>}
  //   </Grid>
  // </Grid>
  // );


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h4' className='flex items-center gap-2'>
            <i className='ri-contacts-line text-primary text-3xl' /> Tags/categories area
          </Typography>
          <Button variant='contained' LinkComponent={Link} href='categories/add' startIcon={<Add />}>Add</Button>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end' alignItems='center' mb={2}>

          </Box>
          <Box sx={{ overflowX: 'auto', width: '100%' }}>


            <Paper className='shadow-md' width={'100%'}>
              <Grid width={'100%'} height={'auto'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4} marginBottom={0} px={4} py={6}>
                <Grid width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={4}>
                  <Box>
                    <Button size='small' variant="outlined" startIcon={<Expand />} onClick={handleExpandAll}>Expand all</Button>
                  </Box>
                  <Box>
                    <Button size='small' variant="outlined" startIcon={<CollapseIcon />} onClick={handleCollapseAll} sx={{ mr: 1 }}>
                      Collpase all
                    </Button>
                  </Box>

                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    variant='outlined'
                    size='small'
                    placeholder='Search by name...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    sx={{ mr: 1 }}
                  />
                </Grid>
              </Grid>
              
              <Grid width={'100%'} display={'flex'} flexDirection={'row'} bgcolor={'rgba(0,0,0,0.04)'} justifyContent={'space-between'} alignItems={'center'} px={4} py={3}>
                <Typography variant='h6' whiteSpace={'nowrap'} gutterBottom>
                  Tags/Categories
                </Typography>
                <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} gap={2}>
                  <Typography>ACTIONS</Typography>
                </Box>
              </Grid>

              <Grid p={6}>

                {loading ? <LoadingSpinner /> : <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <CategoriesTreeView onDelete={handleDelete} toggleExpand={handleToggleExpand} expandedItems={expandedItems} items={items} />
                  </Box>
                </>}
              </Grid>
            </Paper>

          </Box>
        </Grid>
      </Grid>

    </>
  );
}