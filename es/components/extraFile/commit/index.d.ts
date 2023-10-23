/// <reference types="react" />
import { EntityDict } from '../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, keyof EntityDict, boolean, {
    action: string | undefined;
    efPaths: string[];
    size: string;
    block: boolean;
    type: string;
    executeText: string;
    buttonProps: {};
    afterCommit: () => void;
    beforeCommit: () => boolean | undefined | Promise<boolean | undefined>;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
