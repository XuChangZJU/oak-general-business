/// <reference types="react" />
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../general-app-domain").EntityDict, keyof import("../../../general-app-domain").EntityDict, false, {
    bgColor: StringConstructor;
    bgImg: StringConstructor;
    selectedIndex: {
        type: NumberConstructor;
        value: number;
    };
    list: {
        redDot: boolean;
        text: string;
        pagePath: string;
    }[];
    color: {
        type: StringConstructor;
        value: string;
    };
    selectedColor: {
        type: StringConstructor;
        value: string;
    };
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
