export interface TreeNode {
    [key: string]: string | TreeNode;
}

export interface FileProps {
    name: string;
    url: string;
    endpoint: string;
    currentUrl: string;
}

export interface FolderProps {
    name: string;
    parentName: string;
    node: TreeNode;
    endpoint: string;
    currentUrl: string;
    depth?: number;
}

export interface NavigationState {
    mapping: Record<string, string>;
    endpoint: string;
    currentUrl: string;
}
