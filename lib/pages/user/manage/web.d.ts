import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'user', true, {
    userArr: Array<EntityDict['user']['OpSchema'] & {
        avatar: string;
        mobile: string;
    }>;
    stateColor: Record<string, string>;
}, {
    onCellClicked: (id: string) => Promise<void>;
    goNewUser: () => Promise<void>;
}>): JSX.Element;
