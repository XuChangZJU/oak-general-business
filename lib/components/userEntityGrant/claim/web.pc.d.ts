import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    userEntityGrant: EntityDict['userEntityGrant']['Schema'];
    isGrantee: boolean;
    hasClaimed: boolean;
}>): import("react/jsx-runtime").JSX.Element | null;
