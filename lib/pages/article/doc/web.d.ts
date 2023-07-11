import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
interface DataNode {
    label: string;
    title: string;
    key: string;
    isArticle?: boolean;
    children?: DataNode[];
}
export default function render(props: WebComponentProps<EntityDict, "articleMenu", true, {
    treeData: DataNode[];
    openKeys: string[];
    selectedKeys: string[];
    selectedArticleId: string;
    width: string;
    breadcrumbItems: {
        title: string;
    }[];
}, {
    gotoArticleUpsert: (articleId: string, selectedKeys?: string[]) => void;
    getOpenKeys: (targetKey: string, treeData: DataNode[], openKeys: string[]) => void;
    loadArticles: (articleMenuId: string) => void;
    findFirstArticle: (treeData: DataNode[]) => {
        label: string;
        title: string;
        key: string;
        isArticle?: boolean;
        children?: DataNode[];
    };
}>): JSX.Element;
export {};
