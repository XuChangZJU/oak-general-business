/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, "articleMenu", false, {
    onRemove: () => void;
    onUpdateName: (name: string) => Promise<void>;
    onChildEditArticleChange: (data: string) => void;
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
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
