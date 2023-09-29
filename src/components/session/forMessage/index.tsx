import React, { useState, useEffect } from 'react';
import { Button, Image } from 'antd';

import { LeftOutlined } from '@ant-design/icons';
import useFeatures from '../../..//hooks/useFeatures';
import classNames from 'classnames';
import { EntityDict } from '../../../oak-app-domain';
import Style from './index.module.less';
import { useWidth } from 'oak-frontend-base/es/platforms/web';

type HeaderProps = {
    showBack: boolean;
    sessionId: string;
    userId: string; //雇主
};

function Header(props: HeaderProps) {
    const features = useFeatures();
    const width = useWidth();

    const { showBack = true, sessionId, userId } = props;

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (sessionId) {
            const [session] = features.cache?.get(
                'session',
                {
                    data: {
                        id: 1,
                        uerId: 1, //顾客
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
                        id: sessionId!,
                    },
                }
            );
            if (session) {
                const url2 = getAvatarUrl(session);
                setUrl(url2);
                const name2 = getName(session);
                setName(name2);
            }

        }
    }, [sessionId, userId]);

    const getAvatarUrl = (
        session: Partial<EntityDict['session']['Schema']>
    ) => {
        const { entity, user } = session || {};
        const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';

        if (user) {
            const userAvatar = features.extraFile.getUrl(
                session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]
            );
            return userAvatar || defaultUrl;
        }
        return defaultUrl;

    };
    const getName = (
        session: Partial<EntityDict['session']['Schema']>
    ): string => {
        const { user } =
            session || {};
        if (user) {
            const userName = user?.name || '';
            const userNickname = user?.name || user?.nickname || '';
            const userMobile =
                (user?.mobile$user &&
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

    return (
        <div className={classNames(Style.header, {
            [Style.header_mobile]: width === 'xs'
        })}>
            {showBack && (
                <Button
                    type="text"
                    onClick={() => {
                        features.navigator.navigateBack();
                    }}
                >
                    <LeftOutlined className={Style.backIcon} />
                </Button>
            )}
            <div className={Style.middle}>
                <Image src={url} className={Style.icon} preview={false} />
                <div className={Style.name}>{name}</div>
            </div>
        </div>
    );
}

export default Header;
