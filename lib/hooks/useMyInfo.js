"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("react");
const useFeatures_1 = tslib_1.__importDefault(require("./useFeatures"));
function useMyInfo() {
    const features = (0, useFeatures_1.default)();
    const getMyInfo = () => {
        const userInfo = features.token.getUserInfo();
        const mobile = userInfo?.mobile$user && userInfo?.mobile$user[0]?.mobile || '';
        const extraFile = userInfo?.extraFile$entity?.find((ele) => ele.tag1 === 'avatar');
        const avatarUrl = features.extraFile.getUrl(extraFile);
        return {
            avatarUrl,
            name: userInfo?.name || '',
            nickname: userInfo?.nickname || '',
            mobile,
        };
    };
    const myInfo = getMyInfo();
    const [avatarUrl, setAvatarUrl] = (0, react_1.useState)(myInfo.avatarUrl || '');
    const [nickname, setNickname] = (0, react_1.useState)(myInfo.nickname || '');
    const [name, setName] = (0, react_1.useState)(myInfo.name || '');
    const [mobile, setMobile] = (0, react_1.useState)(myInfo.mobile || '');
    (0, react_1.useEffect)(() => {
        const appUnsub = features.application.subscribe(() => {
            const { avatarUrl, nickname, name, mobile } = getMyInfo();
            setAvatarUrl(avatarUrl);
            setNickname(nickname);
            setName(name);
            setMobile(mobile);
        });
        const tokenUnsub = features.token.subscribe(() => {
            const { avatarUrl, nickname, name, mobile } = getMyInfo();
            setAvatarUrl(avatarUrl);
            setNickname(nickname);
            setName(name);
            setMobile(mobile);
        });
        return () => {
            appUnsub();
            tokenUnsub();
        };
    }, []);
    return {
        avatarUrl,
        name,
        nickname,
        mobile,
    };
}
exports.default = useMyInfo;
