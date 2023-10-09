import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'sessionMessage', false, {
    isEntity: boolean;
    isUser: boolean;
    $$createAt$$: number;
    text: string;
    type: string;
    aaoe: boolean;
    picUrl: string;
    sessionId: string;
    id: string;
}, {
    getAvatarUrl: (aaoe: boolean) => string;
}>): import("react/jsx-runtime").JSX.Element;
