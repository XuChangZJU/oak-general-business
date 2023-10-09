import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
}>): import("react/jsx-runtime").JSX.Element | null;
