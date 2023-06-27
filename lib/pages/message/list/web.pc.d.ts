import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', true, {
    messages: RowWithActions<EntityDict, 'message'>[];
}, {
    goDetailById: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
