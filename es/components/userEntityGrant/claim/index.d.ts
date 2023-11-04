/// <reference types="react" />
import { EntityDict } from '../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "userEntityGrant", false, {
    picker: (props: {
        disabled?: boolean | undefined;
        entity: keyof EntityDict;
        entityFilter: object;
        relationIds: string[];
        rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
        ruleOnRow: EntityDict['userEntityGrant']['OpSchema']['ruleOnRow'];
        onPickRelations: (ids: string[]) => void;
        onPickRows: (ids: string[]) => void;
        pickedRowIds?: string[] | undefined;
        pickedRelationIds?: string[] | undefined;
        oakPath: string;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    hideInfo: boolean;
    hideTip: boolean;
    afterClaim: (ueg: EntityDict['userEntityGrant']['OpSchema']) => void;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
