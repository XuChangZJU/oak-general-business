import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
interface customFile {
    name: string;
    size: number;
    type: string;
    originFileObj: File;
}
export default function Render(props: WebComponentProps<EntityDict, 'sessionMessage', true, {
    sessionMessageList: EntityDict['sessionMessage']['Schema'][];
    text: string;
    buttonHidden: boolean;
    sessionId: string;
    isEntity: boolean;
    sessionMessageId: string;
    entityDisplay: (data: EntityDict['session']['Schema'][] | RowWithActions<EntityDict, 'session'>[]) => any[];
    entityProjection: object;
    isWeChat: boolean;
}, {
    customUpload: (file: customFile) => void;
    setContent: (text: string) => void;
    pageScroll: (id: string) => void;
    createMessage: () => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
