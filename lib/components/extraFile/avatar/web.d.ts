import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
    style?: Record<string, string>;
    className?: string;
    avatarUrl?: string;
}, {
    onPickByWeb: (files: File[]) => void;
}>): JSX.Element;
