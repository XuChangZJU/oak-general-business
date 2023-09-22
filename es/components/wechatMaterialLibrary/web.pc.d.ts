import { EntityDict } from "../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, true, {
    type: string;
    materials: any[];
    total: number;
    getMenuContent: (menuContent: any) => void;
}, {
    getMaterialList: (page: number) => void;
    getArticleList: (page: number) => void;
    upload: (media: FormData, description?: FormData) => boolean;
}>): import("react/jsx-runtime").JSX.Element;
