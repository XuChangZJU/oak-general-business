import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: string[];
    entity: keyof EntityDict;
    entityId: string;
    oakId: string;
    legal: boolean;
}, {
    onConfirm: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
