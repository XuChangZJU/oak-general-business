import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import { AvatarSize } from 'antd/es/avatar/SizeContext';
export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    avatarUrl: string;
    shape?: 'circle' | 'square';
    size: AvatarSize;
    iconType?: string;
    iconColor?: string;
    iconName?: string;
    iconLarger?: string;
    onClick?: () => void;
}>): JSX.Element;
