import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
}, {}>): JSX.Element;
