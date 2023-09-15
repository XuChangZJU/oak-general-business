import * as React from 'react';
import './index.less';
type EmptyProps = {
    className?: string;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    image?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
};
interface EmptyType extends React.FC<EmptyProps> {
    PRESENTED_IMAGE_DEFAULT: React.ReactNode;
    PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}
declare const Empty: EmptyType;
export default Empty;
