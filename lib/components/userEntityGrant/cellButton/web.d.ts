/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    oakLegalActions: string[];
}, {
    tapAction: (action: string) => Promise<void>;
}>): JSX.Element[] | null;
