import { EntityDict } from '../../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, keyof EntityDict, true, {
    disabled: boolean | undefined;
    entity: keyof EntityDict;
    entityFilter: any;
    relationIds: string[];
    rule: "single" | "all" | "free";
    ruleOnRow: "single" | "all" | "free";
    onPickRelations: (ids: string[]) => void;
    onPickRows: (ids: string[]) => void;
    pickedRowIds: string[] | undefined;
    pickedRelationIds: string[] | undefined;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
