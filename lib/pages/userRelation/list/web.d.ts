/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    users: (EntityDict['user']['Schema'] & {
        avatar?: string;
        mobile?: string;
    })[];
    searchValue?: string;
    pagination: {
        pageSize: number;
        total: number;
        currentPage: number;
    };
    entity: string;
    entityId: string;
}, {
    goUpsert: () => void;
    confirmDelete: (id: string) => Promise<void>;
    goUpdate: (id: string) => void;
}>): JSX.Element;
