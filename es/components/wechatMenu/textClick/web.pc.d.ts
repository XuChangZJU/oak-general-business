import React from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import "@wangeditor/editor/dist/css/style.css";
import { IDomEditor } from '@wangeditor/editor';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    value: string;
    editor: IDomEditor;
    getDecidedMenuContent: (menuContent: any) => void;
}, {
    setEditor: (editor: IDomEditor | null) => void;
    setHtml: (html: string) => void;
}>): React.JSX.Element;
