/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    mobile: string;
    nickname: string;
    avatarUrl: string;
    userId: string;
}, {
    logout: () => void;
    setVisible: () => void;
}>): JSX.Element;
