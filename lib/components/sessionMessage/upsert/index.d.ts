/// <reference types="react" />
import { UploadFile } from 'antd/es/upload/interface';
import { EntityDict } from '../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "sessionMessage", false, {
    isEntity: boolean;
    customUpload: (file: UploadFile) => void;
    send: () => void;
    setText: (text: string) => void;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
