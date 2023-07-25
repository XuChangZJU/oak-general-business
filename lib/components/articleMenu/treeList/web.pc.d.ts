import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['articleMenu']['OpSchema'][];
    parentId?: string;
    onGrandChildEditArticleChange: (data: string) => void;
    show: string;
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
}, {
    createOne: (name?: string) => Promise<void>;
    getDefaultArticle: (rows: EntityDict['articleMenu']['OpSchema'][]) => void;
}>): import("react/jsx-runtime").JSX.Element | null;
