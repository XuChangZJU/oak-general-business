import React from 'react';
import { Image, Typography } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Style from './web.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'sessionMessage',
        false,
        {
            isEntity: boolean;
            isUser: boolean;
            $$createAt$$: number;
            text: string;
            type: string;
            aaoe: boolean;
            picUrl: string;
            sessionId: string;
            id: string;
        },
        {
            getAvatarUrl: (aaoe: boolean) => string;
        }
    >
) {
    const { data, methods } = props;
    const {
        $$createAt$$,
        text,
        type,
        picUrl,
        isEntity,
        aaoe,
        sessionId,
    } = data;
    const { t, getAvatarUrl } = methods;
    return (
        <ICell time={$$createAt$$}>
            <div
                className={classNames(Style.myMessage, {
                    [Style.notMyMessage]: !(
                        (isEntity && aaoe) ||
                        (!isEntity && !aaoe)
                    ),
                })}
            >
                <Image
                    preview={false}
                    className={Style.avatar}
                    src={getAvatarUrl(aaoe)}
                />
                <div
                    className={classNames({
                        [Style.messageType_text]: type === 'text',
                        [Style.messageType_text_no]: !(
                            (isEntity && aaoe) ||
                            (!isEntity && !aaoe)
                        ),
                    })}
                >
                    {type === 'text' && <IText value={text} />}
                    {type === 'image' && <IImage url={picUrl} />}
                </div>
            </div>
        </ICell>
    );
}

type ICellProps = {
    children: React.ReactNode;
    time: number;
};

function ICell(props: ICellProps) {
    const { children, time } = props;
    const time2 = dayjs(time).startOf('day').valueOf();

    return (
        <div className={Style.cell}>
            <div className={Style.date}>
                {time2 === dayjs().startOf('day').valueOf()
                    ? dayjs(time).format('HH:mm:ss')
                    : dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            {children}
        </div>
    );
}

type ITextProps = {
    value: string;
};

function IText(props: ITextProps) {
    const { value } = props;
    return <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div>;
    // return <div>
    //     <Typography.Paragraph>
    //         {value}
    //     </Typography.Paragraph>
    // </div>;
}

type IImageProps = {
    url: string;
};

function IImage(props: IImageProps) {
    const { url } = props;
    return (
        <Image
            src={url}
            style={{
                width: 120,
                // height: 240,
                borderRadius: 4,
                backgroundColor: '#fff',
            }}
        />
    );
}
