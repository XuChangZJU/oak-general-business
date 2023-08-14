import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
}, {}>): JSX.Element;
