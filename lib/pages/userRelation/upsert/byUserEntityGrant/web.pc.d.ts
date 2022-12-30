/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    relations: string[];
    userEntityGrant: EntityDict['userEntityGrant']['OpSchema'];
    userEntityGrantId: string;
}, {
    confirm: (period: number) => Promise<void>;
    onBack: () => void;
    setInit: () => void;
}>): JSX.Element;
