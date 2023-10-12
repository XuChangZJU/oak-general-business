import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'wechatMenu', true, {
    is_menu_open: boolean;
    applicationId: string;
    menuId: string;
    isPlatform: boolean;
    tabKey: string;
}, {}>): import("react/jsx-runtime").JSX.Element | null;
