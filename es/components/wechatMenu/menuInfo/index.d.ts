/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, keyof import("../../../oak-app-domain").EntityDict, false, {
    id: string;
    config: any;
    menuIndex: number;
    changeConfig: (config: any) => void;
    changePublishState: (publish: 'wait' | 'success' | 'fail') => void;
    getErrorIndex: (errorIndex: number[]) => void;
    createMenu: () => Promise<void>;
    selectedBtn: number;
    selectedSubBtn: number;
    currentIndex: number;
    changeIsPreview: (isPreview: boolean) => void;
    getOpen: (open: boolean) => void;
    menuType: string;
    applicationId: string;
    changeMenuId: (menuId: number) => void;
    deleteMenu: () => void;
    menuId: number;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
