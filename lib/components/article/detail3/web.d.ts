import '@wangeditor/editor/dist/css/style.css';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    oakId: string;
    content: string;
    name: string;
    width: string;
}, {
    gotoArticleEdit: (articleId: string) => void;
    onRemoveArticle: (id: string) => void;
    copy: (id: string) => void;
}>): JSX.Element;
