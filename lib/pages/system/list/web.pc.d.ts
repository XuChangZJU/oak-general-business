import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', true, {
    list: RowWithActions<EntityDict, 'system'>[];
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goSetConfig: (id: string) => void;
    goUpdate: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
