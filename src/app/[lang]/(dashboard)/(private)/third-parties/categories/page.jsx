import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LabelIcon from '@mui/icons-material/Label';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

const data = [
  {
    id: '1',
    label: 'Customer of North Region',
    children: [
      {
        id: '2',
        label: 'Region North A',
      },
      {
        id: '3',
        label: 'Region North B',
      },
    ],
  },
  {
    id: '4',
    label: 'Direct',
  },
  {
    id: '5',
    label: 'Employeur',
  },
  {
    id: '6',
    label: 'PERSONALIZAR AGRO',
    children: [
      {
        id: '7',
        label: 'PME',
      },
      {
        id: '8',
        label: 'PSS',
      },
    ],
  },
  // Add more items as needed
];

const renderTree = (nodes) => (
  <TreeItem 
    key={nodes.id} 
    nodeId={nodes.id} 
    label={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LabelIcon style={{ marginRight: 8 }} />
        {nodes.label}
        <div style={{ marginLeft: 'auto' }}>
          <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
          <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
          <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
        </div>
      </div>
    }>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </TreeItem>
);

const TreeViewExample = () => {
  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {data.map((item) => renderTree(item))}
    </TreeView>
  );
};

export default function Categories() {
  return (
    <div>
      <TreeViewExample />
    </div>
  );
}
