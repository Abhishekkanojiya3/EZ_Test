# Tree View Component

A fully functional React + TypeScript tree view component with expand/collapse, drag-and-drop, lazy loading, and node management capabilities.

## Features

- **Expand/Collapse Nodes**: Toggle parent nodes with animated expand icon
- **Add New Nodes**: Create child nodes anywhere in the tree
- **Remove Nodes**: Delete any node with confirmation dialog
- **Drag & Drop**: Reorder nodes within the same level or move across parents
- **Lazy Loading**: Load child nodes asynchronously when expanded
- **Edit Node Names**: Double-click to inline edit node names
- **Clean UI**: Modern, responsive design with smooth animations

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TreeView.tsx       # Main TreeView component
│   └── TreeNode.tsx       # Individual node component
├── data/
│   └── mockData.ts        # Mock data and lazy loading simulation
├── types/
│   └── index.ts           # TypeScript types
├── styles/
│   ├── TreeView.css       # TreeView styling
│   └── TreeNode.css       # TreeNode styling
├── App.tsx                # Main app component
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## Usage

```typescript
import TreeView from './components/TreeView';
import { initialMockData } from './data/mockData';

<TreeView data={initialMockData} onDataChange={(data) => console.log(data)} />
```

## Components

### TreeView
Main container component that manages the entire tree structure.

**Props:**
- `data`: Array of TreeNode objects
- `onDataChange`: Callback when tree data changes

### TreeNode
Individual node component that handles interactions.

**Features:**
- Expand/collapse with keyboard and mouse support
- Inline editing
- Drag and drop reordering
- Add/remove node actions