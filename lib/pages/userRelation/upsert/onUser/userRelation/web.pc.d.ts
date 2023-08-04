/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    relations2: {
        relation: EntityDict['relation']['OpSchema'];
        isChecked: boolean;
    }[];
}, {
    onRelationChange: (relation: EntityDict['relation']['OpSchema'], checked: boolean) => void;
}>): JSX.Element;
