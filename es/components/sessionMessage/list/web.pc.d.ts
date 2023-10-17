import { UploadFile } from 'antd/es/upload/interface';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'sessionMessage', true, {
    sessionMessages: EntityDict['sessionMessage']['Schema'][];
    sessionId: string;
    isEntity: boolean;
    sessionMessageId: string;
    entityDisplay: (data: EntityDict['session']['Schema'][] | RowWithActions<EntityDict, 'session'>[]) => any[];
    entityProjection: object;
}, {
    customUpload: (file: UploadFile) => void;
    setContent: (text: string) => void;
    pageScroll: (id: string) => void;
    sendMessage: () => void;
}>): import("react/jsx-runtime").JSX.Element;
