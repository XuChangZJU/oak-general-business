import React from "react";
import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Button, Image } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import useFeatures from '../../../hooks/useFeatures';
import classNames from 'classnames';
import { useWidth } from 'oak-frontend-base/es/platforms/web';
export default function render(props: WebComponentProps<
    EntityDict,
    'session',
    false,
    {
        avatarUrl: string,
        nickname: string,
        name: string,
        showBack: boolean;
        sessionId: string;
        session: EntityDict['session']['Schema'];
    },
    {
        getName: () => string;
    }
>) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name, showBack, sessionId, session } = data;
    const { getName } = methods;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png'
    const features = useFeatures();
    const width = useWidth();
    console.log(session)

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
                {/* <Image src={url} className={Style.icon} preview={false} /> */}
                {
                    session && (
                        <div className={Style.name}>{getName()}</div>
                    )
                }
            </div>
        </div>
    );
}