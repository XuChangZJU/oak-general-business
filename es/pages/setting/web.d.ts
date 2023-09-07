import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    mobile: string;
    nickname: string;
    avatarUrl: string;
    userId: string;
}, {
    logout: () => void;
    setVisible: () => void;
}>): import("react/jsx-runtime").JSX.Element;
