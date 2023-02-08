import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    relations: string[];
    period: number;
    userEntityGrant: EntityDict['userEntityGrant']['OpSchema'];
    userEntityGrantId: string;
}, {
    confirm: () => Promise<void>;
    onBack: () => void;
    setInit: () => void;
    setPeriod: (p: number) => void;
}>): JSX.Element;
