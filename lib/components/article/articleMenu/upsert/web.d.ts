import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../../general-app-domain";
export default function render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    name: string;
    parentId: string;
    parentName: string;
}, {
    check: () => void;
    reset: () => void;
    onRemoveArticleMenu: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
