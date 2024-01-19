import { EntityDict } from '../../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "user", false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: import("../../../../oak-app-domain/Relation/Schema").OpSchema[];
    mobile: string;
    setPasswordConfirm: (value: boolean) => void;
    passwordRequire: boolean;
    allowUpdateName: boolean;
    allowUpdateNickname: boolean;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
