import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
    style?: Record<string, string>;
    className?: string;
    avatarUrl?: string;
}, {
    onPickByWeb: (files: File[]) => void;
}>): import("react/jsx-runtime").JSX.Element;
