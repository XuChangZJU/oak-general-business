/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    searchValue: string;
    list: EntityDict['userEntityGrant']['Schema'][];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {}>): JSX.Element;
