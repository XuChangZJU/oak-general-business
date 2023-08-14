/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, keyof import("../../../oak-app-domain").EntityDict, true, {
    areaId: string | null | undefined;
    onCancel: (() => void) | undefined;
    onConfirm: ((stationIds: string[]) => void) | undefined;
    selectIds: string[] | undefined;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
