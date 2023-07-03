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
    articleMenu: EntityDict["articleMenu"]["Schema"][];
    articles: EntityDict["article"]["Schema"][];
    treeData: DataNode[];
    content: string;
    arr: {
        id: string | undefined;
        name: string | undefined;
        parent: string | undefined;
        parentId: string | undefined;
        isArticle: boolean;
        isLeaf: boolean;
    }[];
    id: string;
    parentId: string;
    articleId: string;
    name: string;
    isArticle: boolean;
    isChildren: boolean;
    logo: string;
    openKeys: string[];
    selectedKeys: string[];
    selectedArticleId: string;
}, {
    gotoUpsert: (id?: string) => void;
    gotoUpsertById: (id: string) => void;
    gotoArticleUpsert: (articleId: string, selectedKeys?: string[]) => void;
    check: () => void;
    onRemoveArticleMenu: (id: string) => void;
    gotoEdit: (id?: string) => void;
    gotoEditByParentId: (parentId: string) => void;
    gotoArticleEdit: (articleId: string) => void;
    onRemoveArticle: (id: string) => void;
    gotoArticleEditByArticleMenuId: (articleMenuId: string) => void;
    getOpenKeys: (targetKey: string, treeData: DataNode[], openKeys: string[]) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
