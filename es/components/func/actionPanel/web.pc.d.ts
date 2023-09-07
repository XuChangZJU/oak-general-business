import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    actionss: Array<{
        icon: {
            name: string;
        };
        label: string;
        action: string;
    }>;
    onActionClick: (action: string) => void;
}>): import("react/jsx-runtime").JSX.Element | null;
