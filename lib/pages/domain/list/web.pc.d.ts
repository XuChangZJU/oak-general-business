import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', true, {
    searchValue: string;
    list: EntityDict['system']['Schema'][];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goUpdate: (id: string) => void;
}>): JSX.Element;
