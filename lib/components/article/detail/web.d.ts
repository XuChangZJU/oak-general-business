import '@wangeditor/editor/dist/css/style.css';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    oakId: string;
    content: string;
    name: string;
}, {
    gotoArticleEdit: (articleId: string) => void;
    onRemoveArticle: (id: string) => void;
    gotoPreview: (content: string, name: string, articleId: string) => void;
    copy: (articleId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
