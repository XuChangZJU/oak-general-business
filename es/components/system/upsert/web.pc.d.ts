import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    name: string;
    description: string;
    folder: string;
    super: boolean;
}, {
    confirm: () => void;
}>): import("react/jsx-runtime").JSX.Element;
