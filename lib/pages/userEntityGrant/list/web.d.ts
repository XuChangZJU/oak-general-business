import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    list: EntityDict['userEntityGrant']['Schema'][];
}, {}>): JSX.Element;
