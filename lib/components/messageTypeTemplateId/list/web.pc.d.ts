import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'messageTypeTemplateId', true, {
    mttIds: EntityDict['messageTypeTemplateId']['OpSchema'][];
    dirtyIds: string[];
    messageTypes: string[];
    applicationId: string;
}, {}>): JSX.Element;
