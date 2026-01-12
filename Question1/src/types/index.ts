export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isLoaded?: boolean;
  isLoading?: boolean;
  expanded?: boolean;
}
