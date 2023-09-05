import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    nickname: string;
    password: string;
    mobileValue: string;
    mobileValueReady: boolean;
    oakId: string;
    relations: EntityDict['relation']['OpSchema'][];
    entity: keyof EntityDict;
    entityId: string;
    isNew: boolean;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>): import("react/jsx-runtime").JSX.Element;
