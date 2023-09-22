import { WebComponentProps } from 'oak-frontend-base';
import { ButtonProps } from 'antd-mobile';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';
export default function render(props: WebComponentProps<EntityDict, any, true, {
    state: FileState;
    size?: ButtonProps['size'];
    block?: ButtonProps['block'];
    type?: ButtonProps['type'];
    executeText?: string;
}, {
    upload: () => Promise<void>;
}>): JSX.Element;
