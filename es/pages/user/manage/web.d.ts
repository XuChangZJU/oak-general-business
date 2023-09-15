import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'user', true, {
    userArr: Array<EntityDict['user']['OpSchema'] & {
        avatar: string;
        mobile: string;
    }>;
    stateColor: Record<string, string>;
    isRoot: boolean;
}, {
    onCellClicked: (id: string) => Promise<void>;
    goNewUser: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
