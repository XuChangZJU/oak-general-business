import { WebComponentProps } from 'oak-frontend-base';
import { ButtonProps } from 'antd-mobile';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';
export default function render(props: WebComponentProps<EntityDict, any, true, {
    state: FileState;
    size?: ButtonProps['size'];
    block?: ButtonProps['block'];
    type?: ButtonProps['type'];
    executeText?: string;
    action?: string;
    buttonProps?: ButtonProps;
}, {
    onSubmit: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
