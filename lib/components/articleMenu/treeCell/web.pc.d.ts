import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    row: EntityDict['articleMenu']['OpSchema'];
    allowCreateSubMenu: boolean;
    allowCreateSubArticle: boolean;
    allowRemove: boolean;
    logo: string;
    onRemove: () => void;
    onUpdateName: (name: string) => Promise<void>;
    onChildEditArticleChange: (data: string) => void;
    editArticle: string;
    show: string;
    getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => void;
    breadItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    selectedArticleId: string;
    openArray: string[];
    getTopInfo: (data: {
        name: string;
        date: number;
    }) => void;
    articleId: string;
    articleMenuId: string;
    getSideInfo: (data: {
        id: string;
        name: string;
        coverUrl: string;
    }) => void;
    currentArticle: string;
    setCurrentArticle: (id: string) => void;
}, {
    createSubArticle: (name: string) => Promise<void>;
    createSubArticleMenu: (name: string) => Promise<void>;
    gotoDoc: (articleMenuId: string) => void;
}>): JSX.Element | null;
