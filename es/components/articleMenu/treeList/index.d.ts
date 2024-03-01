/// <reference types="react" />
import { EntityDict } from "../../../oak-app-domain";
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "articleMenu", true, {
    entity: string;
    entityId: string;
    parentId: string | undefined;
    onGrandChildEditArticleChange: (data: string) => void;
    show: string;
    articleMenuId: string;
    articleId: string;
    getBreadcrumbItems: (breadcrumbItems: string[]) => void;
    breadcrumbItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    addOpen: boolean;
    changeAddOpen: (addOpen: boolean) => void;
    selectedArticleId: string;
    defaultOpen: boolean;
    changeDefaultOpen: (defaultOpen: boolean, openArray: string[]) => void;
    openArray: string[];
    getTopInfo: (data: {
        name: string;
        date: number;
    }) => void;
    getSearchOpen: (searchOpenArray: string[]) => void;
    getSideInfo: (data: {
        id: string;
        name: string;
        coverUrl: string;
    }) => void;
    currentArticle: string;
    setCurrentArticle: (id: string) => void;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
