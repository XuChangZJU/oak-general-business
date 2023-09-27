import { useState, useEffect } from 'react';
import useFeatures from './useFeatures';
export default function useMyInfo() {
    const features = useFeatures();
    const getMyInfo = () => {
        const userInfo = features.token.getUserInfo();
        const { mobile } = (userInfo?.mobile$user && userInfo?.mobile$user[0]) ||
            (userInfo?.user$ref &&
                userInfo?.user$ref[0] &&
                userInfo?.user$ref[0].mobile$user &&
                userInfo?.user$ref[0].mobile$user[0]) ||
            {};
        const extraFile = userInfo?.extraFile$entity?.find((ele) => ele.tag1 === 'avatar');
        const avatarUrl = features.extraFile.getUrl(extraFile);
        return {
            avatarUrl,
            name: userInfo?.name || '',
            nickname: userInfo?.nickname || '',
            mobile: mobile || '',
        };
    };
    const myInfo = getMyInfo();
    const [avatarUrl, setAvatarUrl] = useState(myInfo.avatarUrl || '');
    const [nickname, setNickname] = useState(myInfo.nickname || '');
    const [name, setName] = useState(myInfo.name || '');
    const [mobile, setMobile] = useState(myInfo.mobile || '');
    useEffect(() => {
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
