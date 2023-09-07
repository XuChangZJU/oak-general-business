import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Space } from 'antd';
import Style from './web.module.less';
import { UserAddOutlined, UserSwitchOutlined, LoadingOutlined, } from '@ant-design/icons';
import { isWeiXin } from 'oak-frontend-base/es/utils/utils';
import Success from '../../../components/common/result/success';
import Fail from '../../../components/common/result/fail';
export default function Render(props) {
    const { oakLoading, oakExecuting, type, expired, relation, expiresAt, granter, entity, hasConfirmed, //当前用户关系是否存在
    granteeId, number, confirmed, userId, redirectTo, redirectCounter, id, oakId, } = props.data;
    const { t, handleConfirm, redirectPage } = props.methods;
    const isOwner = !!(granteeId && userId === granteeId);
    const getRelationTip = () => {
        let str = `${granter?.name || granter?.nickname}`;
        const relationStr = relation?.display || relation
            ? t(`${entity}:r.${relation?.name}`)
            : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】');
        return str;
    };
    const getDescTip = () => {
        if (hasConfirmed || isOwner) {
            return '您已领取';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }
        // number设置1个的时候
        if (number === 1 && confirmed > 0 && (!isOwner || !hasConfirmed)) {
            return '被他人已领取';
        }
        return '请您领取';
    };
    if (oakLoading) {
        return (_jsx("div", { className: Style.container, children: _jsx(Success, { icon: _jsx(LoadingOutlined, { className: Style.brand_icon }), title: "\u52A0\u8F7D\u4E2D", description: "\u6B63\u5728\u83B7\u53D6\u6570\u636E\uFF0C\u8BF7\u7A0D\u540E" }) }));
    }
    if (oakId !== id) {
        return (_jsx("div", { className: Style.container, children: _jsx(Fail, { title: "\u6570\u636E\u975E\u6CD5", description: "\u62B1\u6B49\uFF0C\u8BE5\u6570\u636E\u4E0D\u5B58\u5728" }) }));
    }
    return (_jsxs("div", { className: Style.container, children: [_jsxs("div", { className: Style.content, children: [type === 'grant' ? (_jsx(UserAddOutlined, { className: Style.icon })) : (_jsx(UserSwitchOutlined, { className: Style.icon })), _jsx("div", { className: Style.title, children: getRelationTip() }), _jsx("div", { className: Style.description, children: getDescTip() })] }), _jsxs(Space, { direction: "vertical", children: [!oakLoading &&
                        !expired &&
                        !hasConfirmed &&
                        !isOwner &&
                        number > confirmed && (_jsx(Button, { size: "large", block: true, type: "primary", onClick: () => {
                            handleConfirm();
                        }, disabled: oakExecuting, children: "\u9886\u53D6" })), isWeiXin && (_jsx(Button, { size: "large", block: true, onClick: () => {
                            WeixinJSBridge.call('closeWindow');
                        }, children: "\u5173\u95ED" }))] })] }));
}
