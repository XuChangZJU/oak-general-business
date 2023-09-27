import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'messageTypeTemplate', true, {
    mtt: EntityDict['messageTypeTemplate']['OpSchema'][];
    dirtyIds: string[];
    messageTypes: string[];
    applicationId: string;
}, {}>): import("react/jsx-runtime").JSX.Element;
