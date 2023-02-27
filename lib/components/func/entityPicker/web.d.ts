import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: string;
    rows: EntityDict[keyof EntityDict]['Schema'][];
    projection: Record<string, any>;
    onSelect: (rows: EntityDict[keyof EntityDict]['Schema'][]) => void;
    multiple: boolean;
}, {}>): JSX.Element;
