import { WebComponentProps } from 'oak-frontend-base';
import { ButtonProps } from 'antd';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';
export default function render(props: WebComponentProps<EntityDict, any, true, {
    state: FileState;
    size?: ButtonProps['size'];
    block?: ButtonProps['block'];
    type?: ButtonProps['type'];
    executeText?: string;
    buttonProps?: ButtonProps;
    afterCommit?: () => void;
}, {
    upload: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
