import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'mobile', false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: string[];
    mobileValue: string;
    mobileValueReady: boolean;
    userId: string;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>): import("react/jsx-runtime").JSX.Element;
