import '@wangeditor/editor/dist/css/style.css';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    articleId: string;
    content: string;
}, {
    gotoArticleEdit: (articleId: string) => void;
    onRemoveArticle: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
