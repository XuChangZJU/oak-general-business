import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'session', false, {
    avatarUrl: string;
    nickname: string;
    name: string;
    showBack: boolean;
    sessionId: string;
}, {
    getName: () => string;
}>): import("react/jsx-runtime").JSX.Element;
