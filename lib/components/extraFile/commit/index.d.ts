/// <reference types="react" />
import { EntityDict } from '../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, keyof EntityDict, boolean, {
    efPaths: string[];
    size: import("antd/es/button").ButtonSize | "mini";
    block: boolean | undefined;
    type: "primary" | "text" | "default" | "link" | "button" | "dashed" | "submit" | "reset" | undefined;
    executeText: string;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
