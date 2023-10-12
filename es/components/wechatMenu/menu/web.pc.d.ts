import { WechatPublicInstance } from 'oak-external-sdk';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'wechatMenu', true, {
    id: string;
    config: any;
    totalConfig: any;
    file: File;
    wechatInstance: WechatPublicInstance;
    errorIndex: number[];
    oakId: string;
    menuType: string;
    applicationId: string;
    actions: string[];
    iState: string;
    tabKey: string;
}, {
    create: () => void;
}>): import("react/jsx-runtime").JSX.Element | null;
