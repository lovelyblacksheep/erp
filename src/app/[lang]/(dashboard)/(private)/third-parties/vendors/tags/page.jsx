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
import { Grid } from '@mui/material';
import { getThirdPartyCategories } from '@/libs/api/third-parties';


const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

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

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 0,
    [`& .content`]: {
      paddingLeft: theme.spacing(2),
    },
  }),
);

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
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
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
            <Typography
              {...getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
              })}
            />
            {/* <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography> */}
            <Grid width={"max-content"} height={"100%"} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"} gap={2}>
                <VisibilityIcon />
                <EditIcon  />
                <DeleteIcon  />
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

// const ItemsList = [
//   {
//     label: "All Mail",
//     labelIcon: MailIcon,
//     id: 1,
//     childs: [],
//     color: "#1a73e8",
//     bgColor: "#e8f0fe",
//     colorForDarkMode: "#D9B8FB",
//     bgColorForDarkMode: alpha('#9035ff', 0.15)
//   },
//   {
//     label: "Trash",
//     labelIcon: DeleteIcon,
//     id: 2,
//     childs: [],
//     color: "#1a73e8",
//     bgColor: "#e8f0fe",
//     colorForDarkMode: "#D9B8FB",
//     bgColorForDarkMode: alpha('#9035ff', 0.15)
//   },
//   {
//     label: "Categories",
//     labelIcon: Label,
//     id: 3,
//     childs: [
//       {
//         label: "Social",
//         labelIcon: SupervisorAccountIcon,
//         id: 4,
//         childs: [],
//         color: "#fff",
//         bgColor: "#000",
//         colorForDarkMode: "#D9B8FB",
//         bgColorForDarkMode: alpha('#9035ff', 0.15)
//       }
//     ],
//     color: "#1a73e8",
//     bgColor: "#e8f0fe",
//     colorForDarkMode: "#D9B8FB",
//     bgColorForDarkMode: alpha('#9035ff', 0.15)
//   }
// ]

const renderTreeItems = (items) => {
  return items.map((item) => (
    <CustomTreeItem
      key={item.id}
      itemId={item.id}
      label={item.label}
      labelIcon={item.labelIcon}
      color={item.color ? '#ffffff' : '#00000'}
      bgColor={item.color}
      colorForDarkMode={item.color ? '#ffffff' : '#00000'}
      bgColorForDarkMode={item.color}
    >
      {item.childs && renderTreeItems(item.childs)}
    </CustomTreeItem>
  ));
};

const convertItems = (data) => {
  const itemsById = data.reduce((acc, item) => {
    acc[item.id] = {
      ...item,
      childs: []
    };
    return acc;
  }, {});

  const ItemsList = [];

  data.forEach((item) => {
    const newItem = itemsById[item.id];
    
    if (item.fk_parent) {
      itemsById[item.fk_parent].childs.push(newItem);
    } else {
      ItemsList.push(newItem);
    }
  });

  return ItemsList;
}

function CategoriesTreeView() {

  const [items, setItems] = React.useState([]);

  const fetchItems = async () => {
    let response = await getThirdPartyCategories();
    if(response && response.status === 200) {
      setItems(convertItems(response.data));
    }
  }

  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <SimpleTreeView
      aria-label="categories"
      defaultExpandedItems={['3']}
      defaultSelectedItems="5"
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
        endIcon: EndIcon,
      }}
      sx={{ flexGrow: 1, maxWidth: '100%', width: '100%' }}
    >
      {renderTreeItems(items)}
    </SimpleTreeView>
  );
}


export default function Categories() {
    return (
        <Box width={'100%'}>
            <CategoriesTreeView />
        </Box>
    );
}