import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
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
}, {
    createSubArticle: (name: string) => Promise<void>;
    createSubArticleMenu: (name: string) => Promise<void>;
    gotoDoc: (articleMenuId: string) => void;
}>): import("react/jsx-runtime").JSX.Element | null;
