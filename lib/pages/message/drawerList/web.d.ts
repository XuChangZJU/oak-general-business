import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    messages: EntityDict['message']['Schema'][];
    onClose: () => void;
    open: boolean;
}, {
    goDetailById: (id: string) => void;
    goMessageList: () => void;
}>): import("react/jsx-runtime").JSX.Element;
