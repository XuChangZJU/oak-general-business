import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
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
}>): import("react/jsx-runtime").JSX.Element;
