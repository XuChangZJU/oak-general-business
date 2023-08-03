import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    relation: string;
    type: 'grant';
    number: number;
    period: number;
    relations: string[];
    entity: string;
    entityId: string;
}, {
    confirm: () => void;
    reset: () => void;
    setRelation: (value: string) => void;
    setNumber: (value: string) => void;
    setPeriod: (value: number | null) => void;
}>): JSX.Element;
