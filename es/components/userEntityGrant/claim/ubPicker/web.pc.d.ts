import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    relations: EntityDict['relation']['OpSchema'][];
    rows: Array<{
        id: string;
        value: string;
    }>;
    rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
    onPickRelations: (ids: string[]) => void;
    onPickRows: (ids: string[]) => void;
    pickedRowIds?: string[];
    pickedRelationIds?: string[];
    entity: string;
    disabled?: boolean;
    disablePickRow?: boolean;
    disablePickRelation?: boolean;
    pickRelationRule: string;
}>): import("react/jsx-runtime").JSX.Element | null;
