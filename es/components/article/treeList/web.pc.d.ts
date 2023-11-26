import React from 'react';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['article']['OpSchema'][];
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
}, {
    createOne: () => Promise<void>;
}>): React.JSX.Element | null;
