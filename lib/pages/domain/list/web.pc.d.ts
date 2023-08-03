import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'domain', true, {
    searchValue: string;
    list: RowWithActions<EntityDict, 'domain'>[];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goUpdate: (id: string) => void;
}>): JSX.Element;
