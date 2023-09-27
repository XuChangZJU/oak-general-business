import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { ReplyType } from '../../../types/WeChat';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    type: ReplyType;
    content: {
        text: string;
        image: string;
        video: string;
        voice: string;
    };
}, {}>): import("react/jsx-runtime").JSX.Element;
