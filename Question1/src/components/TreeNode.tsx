import { useState } from 'react';
import { TreeNode } from '../types/index';
import { generateMockChildren } from '../data/mockData';
import '../styles/TreeNode.css';

interface TreeNodeProps {
  node: TreeNode;
  level?: number;
  onAddNode: (parentId: string, nodeName: string) => void;
  onRemoveNode: (nodeId: string) => void;
  onEditNode: (nodeId: string, newName: string) => void;
  onToggle: (nodeId: string) => void;
  onMoveNode: (nodeId: string, targetParentId: string | null) => void;
  setDraggedNode: (nodeId: string | null) => void;
  draggedNode: string | null;
  isRoot?: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level = 0,
  onAddNode,
  onRemoveNode,
  onEditNode,
  onToggle,
  onMoveNode,
  setDraggedNode,
  draggedNode,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<TreeNode[]>(node.children || []);

  const hasChildren = (node.children && node.children.length > 0) || !node.isLoaded;

  const handleToggle = async () => {
    if (!node.isLoaded && !expanded) {
      // Lazy load children
      setIsLoading(true);
      const loadedChildren = await generateMockChildren(node.name);
      setChildren(loadedChildren);
      setIsLoading(false);
      onToggle(node.id);
    }
    setExpanded(!expanded);
  };

  const handleAddChild = () => {
    const name = prompt('Enter new node name:');
    if (name) {
      onAddNode(node.id, name);
      setChildren([...(children || []), { id: `node_${Date.now()}`, name, children: [], isLoaded: true }]);
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Delete "${node.name}" and all its children?`)) {
      onRemoveNode(node.id);
    }
  };

  const handleEditSave = () => {
    if (editValue.trim()) {
      onEditNode(node.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleDragStart = () => {
    setDraggedNode(node.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNode && draggedNode !== node.id) {
      onMoveNode(draggedNode, node.id);
      setDraggedNode(null);
    }
  };

  return (
    <div className="tree-node" style={{ marginLeft: `${level * 20}px` }}>
      <div
        className={`node-content ${draggedNode === node.id ? 'dragging' : ''}`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {hasChildren && (
          <button
            className={`expand-btn ${expanded ? 'expanded' : ''}`}
            onClick={handleToggle}
            disabled={isLoading}
          >
            {isLoading ? '⏳' : expanded ? '▼' : '▶'}
          </button>
        )}
        {!hasChildren && <span className="expand-placeholder"></span>}

        {isEditing ? (
          <input
            autoFocus
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
        ) : (
          <span
            className="node-label"
            onDoubleClick={() => setIsEditing(true)}
          >
            {node.name}
          </span>
        )}

        <div className="node-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit node"
          >
            ✏️
          </button>
          <button
            className="action-btn add-btn"
            onClick={handleAddChild}
            title="Add child node"
          >
            ➕
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleRemove}
            title="Delete node"
          >
            🗑️
          </button>
        </div>
      </div>

      {expanded && (
        <div className="children-container">
          {children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onAddNode={onAddNode}
              onRemoveNode={onRemoveNode}
              onEditNode={onEditNode}
              onToggle={onToggle}
              onMoveNode={onMoveNode}
              setDraggedNode={setDraggedNode}
              draggedNode={draggedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNodeComponent;
