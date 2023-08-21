import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    searchValue: string;
    list: EntityDict['userEntityGrant']['Schema'][];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {}>): import("react/jsx-runtime").JSX.Element;
