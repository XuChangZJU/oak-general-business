/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    loading: boolean;
    illegal: boolean;
    expired: boolean;
}, {}>): JSX.Element;
