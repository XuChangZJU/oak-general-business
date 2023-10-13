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
            sessionMessages: EntityDict['sessionMessage']['Schema'][];
            userType: string;
            selectedId: string;
            onSelect: (id: string) => void;
            name: string;
            lmts: number;
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
        id,
        unreadLength,
        sessionMessages = [],
        name,
        lmts,
    } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessionMessage = sessionMessages && sessionMessages[0];
    const type = sessionMessage?.type;
    const text = sessionMessage?.text;
    const today = dayjs().startOf('day').valueOf();
    const lastCreateAt = lmts && dayjs(lmts).startOf('day').valueOf();
    
    return (
        <div
            className={classNames(Style.cell, {
                [Style.cell_selected]: id === selectedId,
            })}
            onClick={() => {
                onSelect(id);
            }}
        >
            <Badge dot={id !== selectedId} count={unreadLength || 0}>
                <Image
                    className={Style.avatar}
                    src={getAvatarUrl()}
                    preview={false}
                />
            </Badge>
            <div className={Style.inner}>
                <div className={Style.top}>
                    <div className={Style.title}>{name || getName()}</div>
                    <div className={Style.date}>
                        {lmts &&
                            (today === lastCreateAt
                                ? dayjs(lmts).format('HH:mm')
                                : dayjs(lmts).format('YYYY-MM-DD'))}
                    </div>
                </div>
                <div className={Style.message}>
                    {type &&
                        (type === 'text'
                            ? `${text}`
                            : `[${t(`sessionMessage:v.type.${type}`)}消息]`)}
                </div>
            </div>
        </div>
    );
}