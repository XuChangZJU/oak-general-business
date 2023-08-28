import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    entity: string;
    entityId: string;
    show: string;
    articleMenuId: string;
    width: string;
}, {
    gotoDoc: () => void;
    gotoArticleDetail: (oakId: string) => void;
}>): import("react/jsx-runtime").JSX.Element | null;
