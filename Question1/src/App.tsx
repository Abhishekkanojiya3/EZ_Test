import { useState } from 'react';
import TreeView from './components/TreeView';
import { initialMockData } from './data/mockData';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState(initialMockData);

  return (
    <div className="app">
      <TreeView
        data={treeData}
        onDataChange={setTreeData}
      />
    </div>
  );
}

export default App;
