import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    showBack: boolean;
    variant: "alone" | "inline";
    url: string;
    expiresAt: number;
}, {}>): JSX.Element;
