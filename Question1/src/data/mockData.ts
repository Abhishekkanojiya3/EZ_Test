import { TreeNode } from '../types/index';

// Simulate API delay
const simulateApiDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock lazy data generator
export const generateMockChildren = async (parentName: string): Promise<TreeNode[]> => {
  await simulateApiDelay();
  
  const mockData: { [key: string]: TreeNode[] } = {
    'Project A': [
      { id: 'a1', name: 'Components', children: [] },
      { id: 'a2', name: 'Utils', children: [] },
      { id: 'a3', name: 'Hooks', children: [] },
    ],
    'Project B': [
      { id: 'b1', name: 'API', children: [] },
      { id: 'b2', name: 'Database', children: [] },
    ],
    'Components': [
      { id: 'c1', name: 'Button.tsx', children: [] },
      { id: 'c2', name: 'Modal.tsx', children: [] },
      { id: 'c3', name: 'Card.tsx', children: [] },
    ],
    'Utils': [
      { id: 'u1', name: 'helpers.ts', children: [] },
      { id: 'u2', name: 'validators.ts', children: [] },
    ],
    'Hooks': [
      { id: 'h1', name: 'useForm.ts', children: [] },
      { id: 'h2', name: 'useFetch.ts', children: [] },
    ],
  };

  return mockData[parentName] || [];
};

// Initial mock data
export const initialMockData: TreeNode[] = [
  {
    id: 'root1',
    name: 'Project A',
    children: [],
    isLoaded: false,
  },
  {
    id: 'root2',
    name: 'Project B',
    children: [],
    isLoaded: false,
  },
  {
    id: 'root3',
    name: 'Documents',
    children: [
      { id: 'doc1', name: 'README.md', children: [] },
      { id: 'doc2', name: 'CHANGELOG.md', children: [] },
    ],
    isLoaded: true,
  },
];
