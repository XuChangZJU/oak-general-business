import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'sessionMessage', false, {
    isEntity: boolean;
    $$createAt$$: number;
    text: string;
    type: string;
    aaoe: boolean;
    picUrl: string;
    sessionId: string;
    id: string;
}, {
    getAvatarUrl: (type: string) => string;
}>): import("react/jsx-runtime").JSX.Element;
