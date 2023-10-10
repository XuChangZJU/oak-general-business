import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'session', false, {
    id: string;
    unreadLength: number;
    sessiontMessages: EntityDict['sessionMessage']['Schema'][];
    userType: string;
    selectedId: string;
    onSelect: (id: string) => void;
    name: string;
}, {
    getName: () => string;
    getAvatarUrl: () => string;
}>): import("react/jsx-runtime").JSX.Element;
