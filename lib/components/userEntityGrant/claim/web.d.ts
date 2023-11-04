/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    userEntityGrant: EntityDict['userEntityGrant']['Schema'];
    isGrantee: boolean;
    hasClaimed: boolean;
    counterStr: string;
    hideInfo: boolean;
    pickedRowIds?: string[];
    pickedRelationIds?: string[];
    content: (props: {
        entity: keyof EntityDict;
        entityFilter: object;
        relationIds: string[];
        rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
        ruleOnRow: EntityDict['userEntityGrant']['OpSchema']['ruleOnRow'];
        onPickRelations: (ids: string[]) => void;
        onPickRows: (id: string[]) => void;
        oakPath: string;
        pickedRowIds?: string[];
        pickedRelationIds?: string[];
    }) => React.ReactElement;
}, {
    onPickRelations: (ids: string[]) => void;
    onPickRows: (ids: string[]) => void;
}>): import("react/jsx-runtime").JSX.Element | null;
