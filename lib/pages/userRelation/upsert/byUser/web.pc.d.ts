/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: string[];
    entity: string;
    entityId: string;
    oakId: string;
    legal: boolean;
}, {
    onConfirm: () => Promise<void>;
}>): JSX.Element;
