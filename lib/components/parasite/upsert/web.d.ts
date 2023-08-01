import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'parasite', false, {
    entity: keyof EntityDict;
    entityId: string;
    relation: string;
}, {}>): import("react/jsx-runtime").JSX.Element;
