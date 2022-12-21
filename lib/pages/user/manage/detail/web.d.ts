import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    nickname?: string;
    avatar?: string;
    name?: string;
    mobile?: string;
    userState?: string;
    birth?: string;
    idState?: string;
    gender?: string;
    stateColor: Record<string, string>;
    idStateColor: Record<string, string>;
    mobileCount: number;
    mobileText: string;
    actionDescriptions: Record<string, {
        icon: {
            name: string;
        };
        label: string;
    }>;
}, {
    onActionClick: (action: string) => Promise<void>;
}>): JSX.Element;
