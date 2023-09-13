import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'application', true, {
    list: RowWithActions<EntityDict, 'application'>[];
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goSetConfig: (id: string) => void;
    goUpdate: (id: string) => void;
    removeApplication: (id: string) => void;
}>): JSX.Element;
