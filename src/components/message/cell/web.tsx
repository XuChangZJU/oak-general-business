import React from 'react';
import { Tag, Badge } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

const MessageType = {
    adminNotification: '系统通知',
    conversationMessage: '客服消息',
};

// success、 processing、error、default、warning
const MessageTypeToColor = {
    adminNotification: 'processing',
    conversationMessage: 'warning',
};


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            onItemClicked: (item: {
                id: string;
                params: EntityDict['message']['Schema']['params'];
            }) => void;
            $$createAt$$: number;
            type: string;
            title: string;
            params: EntityDict['message']['Schema']['params'];
            visitState: EntityDict['message']['Schema']['visitState'];
            id: string;
        },
        {}
    >
) {
    const { data, methods } = props;
    const {
        id,
        params,
        title,
        type,
        $$createAt$$,
        visitState,
        oakLegalActions = [],
        onItemClicked,
    } = data;
    const { navigateTo, execute } = methods;

    return (
        <div
            className={Style.list}
            onClick={
                onItemClicked
                    ? () => {
                          onItemClicked({
                              id,
                              params,
                          });
                      }
                    : undefined
            }
        >
            <div className={Style.list__notify}>
                {visitState === 'unvisited' && (
                    <Badge
                        style={{ marginRight: 5 }}
                        status="processing"
                    ></Badge>
                )}
                <div className={Style.notify_deadline}>{title}</div>
                {oakLegalActions.includes('visit') && (
                    <div
                        className={Style.notify_mask}
                        onClick={(event) => {
                            execute('visit', false);
                            event.stopPropagation();
                        }}
                    >
                        标记已读
                    </div>
                )}
            </div>
            <div className={Style.list__info}>
                <div className={Style.tags}>
                    <Tag
                        color={
                            MessageTypeToColor[
                                type as keyof typeof MessageTypeToColor
                            ]
                        }
                    >
                        {MessageType[type as keyof typeof MessageType]}
                    </Tag>
                </div>

                <div className={Style.create_time}>
                    {dayjs($$createAt$$).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            </div>
        </div>
    );
}
