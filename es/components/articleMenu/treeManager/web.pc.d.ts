import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    entity: string;
    entityId: string;
    show: string;
    articleMenuId: string;
    articleId: string;
    width: string;
    filteredArticles: EntityDict['article']['Schema'][];
}, {
    gotoDoc: () => void;
    gotoArticleDetail: (oakId: string) => void;
    searchArticle: (searchValue: string) => void;
    getArticleMenuIdByArticle: (articleId: string, type: string) => void;
    gotoSearchArticleAndArticleMenu: (articleMenuId: string, articleId: string) => void;
}>): JSX.Element | null;
