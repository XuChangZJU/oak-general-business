/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    grantByUserEntityGrant: boolean;
    grantByEmail: boolean;
    grantByMobile: boolean;
    grantMethodCount: number;
    redirectToAfterConfirm: string;
    entity: string;
    entityId: string;
    relations: string[];
}, {}>): JSX.Element;
