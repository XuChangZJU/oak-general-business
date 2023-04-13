import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    nameText?: string;
    mobileText?: string;
    userId?: string;
    gender: string;
    showLogout?: string;
    nickname?: string;
    name?: string;
    idState?: string;
    userState?: string;
}, {
    logout: () => void;
    updateAttribute: (attr: string, value: any) => Promise<void>;
}>): JSX.Element;
