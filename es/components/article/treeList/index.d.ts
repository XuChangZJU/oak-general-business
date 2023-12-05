declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, "article", true, {
    articleMenuId: string | undefined;
    onChildEditArticleChange: (data: string) => void;
    show: string;
    getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => void;
    breadcrumbItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    selectedArticleId: string;
    openArray: string[];
    getTopInfo: (data: {
        name: string;
        date: number;
    }) => void;
    articleId: string;
    currentArticle: string;
    setCurrentArticle: (id: string) => void;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
