import { ReplyType } from "../../../types/WeChat";
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<import("../../../oak-app-domain").EntityDict, keyof import("../../../oak-app-domain").EntityDict, false, {
    type: ReplyType;
    content: {
        text: string;
        image: string;
        video: string;
        voice: string;
    };
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
