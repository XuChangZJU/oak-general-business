import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
    channels: string[];
    oakId: string;
}, {
    goToMobile: () => void;
}>): import("react/jsx-runtime").JSX.Element;
