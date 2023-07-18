/// <reference types="react" />
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    oakId: string;
    name: string;
    parentId: string;
    parentName: string;
    isArticle: boolean;
    isLeaf: boolean;
    logo: string;
}, {
    goUpsert: (id?: string) => void;
    gotoEditByParentId: (parentId: string) => void;
    gotoArticleEditByArticleMenuId: (articleMenuId: string) => void;
    onRemoveArticleMenu: (id: string) => void;
}>): JSX.Element;
