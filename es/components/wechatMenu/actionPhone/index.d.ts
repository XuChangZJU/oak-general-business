/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, keyof import("../../../oak-app-domain").EntityDict, false, {
    id: string;
    config: any;
    menuIndex: number;
    changeConfig: (config: any) => void;
    menuType: string;
    getSelectedBtn: (selectedBtn: number) => void;
    getSelectedSubBtn: (selectedSubBtn: number) => void;
    getCurrentIndex: (currentIndex: number) => void;
    errorIndex: number[];
    isPreview: boolean;
    open: boolean;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
