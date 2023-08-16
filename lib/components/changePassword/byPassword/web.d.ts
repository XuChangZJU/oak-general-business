import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
    failTimes: number;
}, {
    onConfirm: (prevPassword: string, password: string) => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
