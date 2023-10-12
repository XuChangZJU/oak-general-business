/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, "session", true, {
    entity: string;
    entityFilter: any;
    entityDisplay: (data: any) => any[];
    entityProjection: any;
    sessionId: string;
    dialog: boolean;
    onItemClick: ((sessionId: string) => {}) | null | undefined;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
