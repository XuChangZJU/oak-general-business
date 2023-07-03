import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
interface DataNode {
    label: string;
    title: string;
    key: string;
    isArticle?: boolean;
    children?: DataNode[];
}
export default function render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    articleMenu: EntityDict['articleMenu']['Schema'][];
    articles: EntityDict['article']['Schema'][];
    treeData: DataNode[];
    selectArticleMenuId: string;
    selectArticleId: string;
    entity: string;
    entityId: string;
    pagination?: {
        pageSize: number;
        total: number;
        currentPage: number;
    };
}, {
    gotoUpsertById: (id: string) => void;
    gotoArticleUpsert: (articleId: string) => void;
    onRemoveArticleMenu: (id: string) => void;
    gotoEdit: (id?: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
