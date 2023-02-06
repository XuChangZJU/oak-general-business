/// <reference types="react" />
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    actionss: Array<{
        icon: {
            name: string;
        };
        label: string;
        action: string;
    }>;
}, {
    onClick: (action: string) => void;
}>): JSX.Element | null;
