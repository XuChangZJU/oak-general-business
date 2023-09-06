import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import QrCode from '../../../components/common/qrCode';
import { Spin } from 'antd';
export default function Render(props) {
    const { variant, showBack = true, url, expiresAt, title = '授权二维码', oakLoading, } = props.data;
    return (_jsx(Container, { showBack: showBack, variant: variant, title: title, children: oakLoading ? (_jsx("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
            }, children: _jsx(Spin, { size: "large" }) })) : (_jsx(QrCode, { url: url, expiresAt: expiresAt })) }));
}
function Container(props) {
    const { children, variant = 'alone', showBack, title, } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(PageHeader, { showBack: showBack, title: title, children: _jsx("div", { className: Style.container, children: children }) }));
}
