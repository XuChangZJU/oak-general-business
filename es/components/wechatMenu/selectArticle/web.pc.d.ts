import React from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, true, {
    type: string;
    materials: any[];
    total: number;
    getUrl: (url: string) => void;
    changeOpen: (open: boolean) => void;
}, {
    getArticleList: (page: number) => void;
    upload: (media: FormData, description?: FormData) => boolean;
}>): React.JSX.Element;
