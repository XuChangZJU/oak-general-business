import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
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
    getTopInfo: (data: {
        name: string;
        date: number;
    }) => void;
}, {
    createOne: (name?: string) => Promise<void>;
    getDefaultArticle: (rows: EntityDict['articleMenu']['OpSchema'][]) => void;
}>): JSX.Element | null;
