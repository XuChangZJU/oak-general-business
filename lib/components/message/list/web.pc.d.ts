import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', true, {
    messages: RowWithActions<EntityDict, 'message'>[];
}, {
    goDetailById: (id: string) => void;
}>): JSX.Element;
