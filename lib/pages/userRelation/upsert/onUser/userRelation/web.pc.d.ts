import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    userRelations: Array<{
        relation: string;
    }>;
    relations: string[];
}, {
    onRelationChange: (relation: string, checked: boolean) => void;
    isChecked: (relation: string) => boolean;
}>): JSX.Element;
