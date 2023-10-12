import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import useFeatures from '../../../hooks/useFeatures';
import classNames from 'classnames';
import { useWidth } from 'oak-frontend-base/es/platforms/web';
export default function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name, showBack, sessionId, session } = data;
    const { getName } = methods;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
    const features = useFeatures();
    const width = useWidth();
    return (_jsxs("div", { className: classNames(Style.header, {
            [Style.header_mobile]: width === 'xs'
        }), children: [showBack && (_jsx(Button, { type: "text", onClick: () => {
                    features.navigator.navigateBack();
                }, children: _jsx(LeftOutlined, { className: Style.backIcon }) })), _jsx("div", { className: Style.middle, children: session && (_jsx("div", { className: Style.name, children: getName() })) })] }));
}
