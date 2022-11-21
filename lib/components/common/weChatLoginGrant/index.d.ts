import React from 'react';
import './index.less';
interface GrantProps {
    id?: string;
    appId: string;
    scope: 'snsapi_userinfo' | 'snsapi_login';
    redirectUri: string;
    state: string;
    style?: React.CSSProperties;
    className?: string;
    dev?: boolean;
}
declare function Grant(props: GrantProps): JSX.Element;
export default Grant;
