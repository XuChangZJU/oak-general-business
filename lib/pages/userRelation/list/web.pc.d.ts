import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    users: any[];
    searchValue?: string;
    pagination: {
        pageSize: number;
        total: number;
        currentPage: number;
    };
    entity: string;
    entityId: string;
    showBack: boolean;
    showTitle: boolean;
}, {
    goUpsert: () => void;
    goUpdate: (id: string) => void;
    confirmDelete: (id: string) => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
