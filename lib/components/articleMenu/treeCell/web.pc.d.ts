/// <reference types="react" />
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    row: EntityDict['articleMenu']['OpSchema'];
    allowCreateSubMenu: boolean;
    allowCreateSubArticle: boolean;
    allowRemove: boolean;
    onRemove: () => void;
    onUpdateName: (name: string) => Promise<void>;
}, {
    createSubArticle: (name: string) => Promise<void>;
    createSubArticleMenu: (name: string) => Promise<void>;
}>): JSX.Element | null;
