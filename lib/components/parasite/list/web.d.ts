import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'parasite', true, {
    searchValue: string;
    list: EntityDict['userEntityGrant']['Schema'][];
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {}>): import("react/jsx-runtime").JSX.Element;
