import React, { useState, useEffect } from 'react';

import { GeneralFeatures } from '../features';
import { useFeatures } from 'oak-frontend-base/lib/platforms/web/features';
import { EntityDict } from '../general-app-domain';
import { BRC, FrcAspectDict, FRC} from '../types/RuntimeCxt';
import { OpSchema as ExtraFile } from '../general-app-domain/ExtraFile/Schema';

export default function useMyInfo() {
    const features = useFeatures<GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict>>();

    const getMyInfo = () => {
        const userInfo = features.token.getUserInfo();
        const mobile =
            userInfo?.mobile$user && userInfo?.mobile$user[0]?.mobile || '';

        const extraFile = userInfo?.extraFile$entity?.find(
            (ele: ExtraFile) => ele.tag1 === 'avatar'
        );
        const avatarUrl = features.extraFile.getUrl(extraFile);

        return {
            avatarUrl,
            name: userInfo?.name || '',
            nickname: userInfo?.nickname || '',
            mobile,
        };
    };

    const myInfo = getMyInfo();
    const [avatarUrl, setAvatarUrl] = useState<string>(myInfo.avatarUrl || '');
    const [nickname, setNickname] = useState<string>(myInfo.nickname || '');
    const [name, setName] = useState<string>(myInfo.name || '');
    const [mobile, setMobile] = useState<string>(myInfo.mobile || '');

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
