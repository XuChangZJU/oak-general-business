import React from 'react';
import { Badge } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            onItemClicked: (item: {
                id: string;
                router: EntityDict['message']['Schema']['router'];
            }) => void;
            $$createAt$$: number;
            type: string;
            title: string;
            router: EntityDict['message']['Schema']['router'];
            visitState: EntityDict['message']['Schema']['visitState'];
            id: string;
        },
        {}
    >
) {
    const { data, methods } = props;
    const {
        id,
        router,
        title,
        type,
        $$createAt$$,
        visitState,
        oakLegalActions,
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
                              router,
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
                {oakLegalActions?.includes('visit') && (
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
                <div className={Style.create_time}>
                    {dayjs($$createAt$$).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            </div>
        </div>
    );
}
