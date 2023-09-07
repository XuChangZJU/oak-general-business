import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    relation: EntityDict['relation']['OpSchema'];
    type: 'grant';
    number: number;
    period: number;
    relations: EntityDict['relation']['OpSchema'][];
    entity: string;
    entityId: string;
    relationId: string;
}, {
    confirm: () => void;
    reset: () => void;
    setRelationId: (value: string) => void;
    setNumber: (value: string) => void;
    setPeriod: (value: number | null) => void;
}>): import("react/jsx-runtime").JSX.Element;
