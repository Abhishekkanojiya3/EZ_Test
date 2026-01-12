import React, { useState, useCallback } from 'react';
import { TreeNode } from '../types/index';
import TreeNodeComponent from './TreeNode';
import '../styles/TreeView.css';

interface TreeViewProps {
  data: TreeNode[];
  onDataChange?: (data: TreeNode[]) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onDataChange }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(data);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  const handleDataUpdate = useCallback((updatedData: TreeNode[]) => {
    setTreeData(updatedData);
    onDataChange?.(updatedData);
  }, [onDataChange]);

  const addNode = useCallback((parentId: string | null, nodeName: string) => {
    const newNode: TreeNode = {
      id: `node_${Date.now()}`,
      name: nodeName,
      children: [],
      isLoaded: true,
    };

    if (parentId === null) {
      // Add to root
      handleDataUpdate([...treeData, newNode]);
    } else {
      // Add to specific parent
      const updatedData = updateNodeInTree(treeData, parentId, (node) => ({
        ...node,
        children: [...(node.children || []), newNode],
      }));
      handleDataUpdate(updatedData);
    }
  }, [treeData, handleDataUpdate]);

  const removeNode = useCallback((nodeId: string) => {
    const removeFromTree = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter(node => node.id !== nodeId)
        .map(node => ({
          ...node,
          children: node.children ? removeFromTree(node.children) : undefined,
        }));
    };
    handleDataUpdate(removeFromTree(treeData));
  }, [treeData, handleDataUpdate]);

  const editNodeName = useCallback((nodeId: string, newName: string) => {
    const updatedData = updateNodeInTree(treeData, nodeId, (node) => ({
      ...node,
      name: newName,
    }));
    handleDataUpdate(updatedData);
  }, [treeData, handleDataUpdate]);

  const toggleNode = useCallback((nodeId: string) => {
    const updatedData = updateNodeInTree(treeData, nodeId, (node) => ({
      ...node,
      expanded: !node.expanded,
    }));
    handleDataUpdate(updatedData);
  }, [treeData, handleDataUpdate]);

  const moveNode = useCallback((nodeId: string, targetParentId: string | null) => {
    let movedNode: TreeNode | null = null;

    // Extract the node
    const removeNode = (nodes: TreeNode[]): TreeNode[] => {
      const result = [];
      for (const node of nodes) {
        if (node.id === nodeId) {
          movedNode = node;
        } else {
          result.push({
            ...node,
            children: node.children ? removeNode(node.children) : undefined,
          });
        }
      }
      return result;
    };

    let updatedData = removeNode(treeData);

    if (movedNode) {
      if (targetParentId === null) {
        updatedData = [...updatedData, movedNode];
      } else {
        updatedData = updateNodeInTree(updatedData, targetParentId, (node) => ({
          ...node,
          children: [...(node.children || []), movedNode!],
        }));
      }
    }

    handleDataUpdate(updatedData);
  }, [treeData, handleDataUpdate]);

  return (
    <div className="tree-view">
      <div className="tree-header">
        <h2>Tree View Component</h2>
        <button
          className="add-root-btn"
          onClick={() => {
            const name = prompt('Enter new node name:');
            if (name) addNode(null, name);
          }}
        >
          + Add Root Node
        </button>
      </div>
      <div className="tree-container">
        {treeData.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onAddNode={addNode}
            onRemoveNode={removeNode}
            onEditNode={editNodeName}
            onToggle={toggleNode}
            onMoveNode={moveNode}
            setDraggedNode={setDraggedNode}
            draggedNode={draggedNode}
            isRoot
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to update a node in the tree
const updateNodeInTree = (
  nodes: TreeNode[],
  nodeId: string,
  updateFn: (node: TreeNode) => TreeNode
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return updateFn(node);
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, updateFn),
      };
    }
    return node;
  });
};

export default TreeView;
