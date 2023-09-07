import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    userArr: Array<EntityDict['user']['OpSchema'] & {
        avatar: string;
        mobile: string;
    }>;
    stateColor: Record<string, string>;
    isRoot: boolean;
}, {
    onCellClicked: (id: string, event?: string) => Promise<void>;
    goNewUser: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
