import React from "react";
import { Image, Badge } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'session',
        false,
        {
            id: string;
            unreadLength: number;
            sessiontMessages: EntityDict['sessionMessage']['Schema'][];
            userType: string;
            selectedId: string;
            onSelect: (id: string) => void;
        },
        {
            getName: () => string;
            getAvatarUrl: () => string;
        }
    >
) {
    const { methods, data } = props;
    const {
        selectedId,
        onSelect,
        userType,
        id,
        unreadLength,
        sessiontMessages = [],
    } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessiontMessage = sessiontMessages && sessiontMessages[0];
    const createAt = sessiontMessage?.$$createAt$$;
    const type = sessiontMessage?.type;
    const text = sessiontMessage?.text;
    const today = dayjs().startOf('day').valueOf();
    const createAt2 = createAt && dayjs(createAt).startOf('day').valueOf();
    return (
        <div
            className={classNames(Style.cell, {
                [Style.cell_selected]: id === selectedId,
            })}
            onClick={() => {
                onSelect(id);
            }}
        >
            <Badge
                dot={
                    id === selectedId ? false : true
                }
                count={
                    unreadLength || 0
                }
            >
                <Image
                    className={Style.avatar}
                    src={getAvatarUrl()}
                    preview={false}
                />
            </Badge>
            <div className={Style.inner}>
                <div className={Style.top}>
                    <div className={Style.title}>{getName()}</div>
                    <div className={Style.date}>
                        {sessiontMessage &&
                            (today === createAt2
                                ? dayjs(createAt).format('HH:mm')
                                : dayjs(createAt).format('YYYY-MM-DD'))}
                    </div>
                </div>
                <div className={Style.message}>
                    {type &&
                        (type === 'text'
                            ? `${text}`
                            : `[${t(
                                `sessiontMessage:v.type.${type}`
                            )}消息]`)}
                </div>
            </div>
        </div>
    );
}