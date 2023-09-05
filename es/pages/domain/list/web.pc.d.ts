import { EntityDict } from '../../../oak-app-domain';
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
}>): import("react/jsx-runtime").JSX.Element;
