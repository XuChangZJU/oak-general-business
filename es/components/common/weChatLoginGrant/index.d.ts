import React from 'react';
import './index.less';
interface GrantProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state?: string;
    style?: React.CSSProperties;
    className?: string;
    dev?: boolean;
    disabled?: boolean;
    disableText?: string;
    rootStyle?: React.CSSProperties;
    rootClassName?: string;
}
declare function Grant(props: GrantProps): React.JSX.Element;
export default Grant;
