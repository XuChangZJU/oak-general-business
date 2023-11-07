import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    entityId: string;
    entity: string;
    relationEntity: string;
    showBack: boolean;
    userEntityGrantId: string;
    period: number;
}, {
    search: (value: string) => void;
    setPeriod: (period: number) => void;
    confirm: () => void;
    setInit: () => void;
}>): import("react/jsx-runtime").JSX.Element;
