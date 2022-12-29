import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'application', true, {
    searchValue: string;
    list: EntityDict['application']['Schema'][];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goSetConfig: (id: string) => void;
    goUpdate: (id: string) => void;
    removeApplication: (id: string) => void;
}>): JSX.Element;
