import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'article', true, {
    searchValue: string;
    articles: EntityDict['article']['Schema'][];
    pagination: any;
    title?: string;
    showBack?: boolean;
}, {
    goUpsert: () => Promise<void>;
    goDetailById: (id: string) => Promise<void>;
    goUpsertById: (id: string) => Promise<void>;
    searchValueChange: (v: string) => Promise<void>;
    searchConfirm: () => Promise<void>;
    onRemove: (id: string) => Promise<void>;
}>): JSX.Element;
