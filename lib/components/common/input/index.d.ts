import React from 'react';
import { InputProps } from 'antd';
interface IProps extends InputProps {
    value?: string;
    autoSize?: boolean | object;
}
declare const Component: {
    (props: IProps): JSX.Element;
    Search(props: IProps): JSX.Element;
    TextArea(props: IProps): JSX.Element;
    Password: React.ForwardRefExoticComponent<import("antd/es/input").PasswordProps & React.RefAttributes<import("antd").InputRef>>;
    Group: React.FC<import("antd/es/input").GroupProps>;
};
export default Component;
