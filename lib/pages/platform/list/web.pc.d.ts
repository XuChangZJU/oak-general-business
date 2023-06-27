import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', true, {
    searchValue: string;
    list: RowWithActions<EntityDict, 'platform'>[];
    pagination: any;
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goSetConfig: (id: string) => void;
    goUpdate: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
