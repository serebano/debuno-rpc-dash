export interface TreeNode {
    [key: string]: string | TreeNode;
}

export interface FileProps {
    name: string;
    url: string;
    currentUrl: string;
}

export interface FolderProps {
    name: string;
    node: TreeNode;
    currentUrl: string;
    depth?: number;
}

export interface NavigationState {
    mapping: Record<string, string>;
    currentUrl: string;
}
