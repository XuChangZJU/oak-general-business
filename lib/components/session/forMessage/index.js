"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const useFeatures_1 = tslib_1.__importDefault(require("../../..//hooks/useFeatures"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
const web_1 = require("oak-frontend-base/es/platforms/web");
function Header(props) {
    const features = (0, useFeatures_1.default)();
    const width = (0, web_1.useWidth)();
    const { showBack = true, sessionId, userId } = props;
    const [name, setName] = (0, react_1.useState)('');
    const [url, setUrl] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (sessionId) {
            const [session] = features.cache?.get('session', {
                data: {
                    id: 1,
                    uerId: 1,
                    user: {
                        id: 1,
                        name: 1,
                        nickname: 1,
                        mobile$user: {
                            $entity: 'mobile',
                            data: {
                                id: 1,
                                mobile: 1,
                                userId: 1,
                            },
                        },
                        extraFile$entity: {
                            $entity: 'extraFile',
                            data: {
                                id: 1,
                                tag1: 1,
                                origin: 1,
                                bucket: 1,
                                objectId: 1,
                                filename: 1,
                                extra1: 1,
                                extension: 1,
                                type: 1,
                                entity: 1,
                                entityId: 1,
                            },
                            filter: {
                                tag1: {
                                    $in: ['avatar'],
                                },
                            },
                        },
                    },
                },
                filter: {
                    id: sessionId,
                },
            });
            if (session) {
                const url2 = getAvatarUrl(session);
                setUrl(url2);
                const name2 = getName(session);
                setName(name2);
            }
        }
    }, [sessionId, userId]);
    const getAvatarUrl = (session) => {
        const { entity, user } = session || {};
        const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
        if (user) {
            const userAvatar = features.extraFile.getUrl(session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]);
            return userAvatar || defaultUrl;
        }
        return defaultUrl;
    };
    const getName = (session) => {
        const { user } = session || {};
        if (user) {
            const userName = user?.name || '';
            const userNickname = user?.name || user?.nickname || '';
            const userMobile = (user?.mobile$user &&
                user?.mobile$user[0]?.mobile) ||
                '';
            if (userName) {
                return userName;
            }
            if (userMobile) {
                return '用户' + userMobile;
            }
            return userNickname;
        }
        return '未知';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(index_module_less_1.default.header, {
            [index_module_less_1.default.header_mobile]: width === 'xs'
        }), children: [showBack && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: () => {
                    features.navigator.navigateBack();
                }, children: (0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, { className: index_module_less_1.default.backIcon }) })), (0, jsx_runtime_1.jsxs)("div", { className: index_module_less_1.default.middle, children: [(0, jsx_runtime_1.jsx)(antd_1.Image, { src: url, className: index_module_less_1.default.icon, preview: false }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.name, children: name })] })] }));
}
exports.default = Header;
