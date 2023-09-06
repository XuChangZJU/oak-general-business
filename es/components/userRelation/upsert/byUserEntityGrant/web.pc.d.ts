import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
declare type Unit = 'minute' | 'hour' | 'day';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    relations: EntityDict['relation']['OpSchema'][];
    period: number;
    userEntityGrant: EntityDict['userEntityGrant']['OpSchema'];
    userEntityGrantId: string;
    unit: Unit;
    maxes: Record<Unit, number>;
    unitArr: Array<{
        label: string;
        value: Unit;
    }>;
}, {
    confirm: () => Promise<void>;
    onBack: () => void;
    setInit: () => void;
    setPeriod: (p: number) => void;
    setUnit: (u: Unit) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
