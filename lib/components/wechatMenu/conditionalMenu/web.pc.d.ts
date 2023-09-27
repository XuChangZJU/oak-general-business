import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'wechatMenu', true, {
    id: string;
    config: any;
    file: File;
    errorIndex: number[];
    oakId: string;
    menuIndex: number;
    applicationId: string;
    menuType: string;
    menuId: number;
    wechatId: string;
    iState: string;
}, {}>): import("react/jsx-runtime").JSX.Element | null;
