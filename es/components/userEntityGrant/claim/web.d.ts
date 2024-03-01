import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    userEntityGrant: EntityDict['userEntityGrant']['Schema'];
    isGranter: boolean;
    hasClaimed: boolean;
    counterStr: string;
    hideInfo: boolean;
    hideTip: boolean;
    pickedRowIds?: string[];
    pickedRelationIds?: string[];
    picker?: (props: {
        disabled?: boolean;
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
    claim: () => void;
}>): React.JSX.Element | null;
