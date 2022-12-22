import React from 'react';
import { Tag, Badge } from 'antd';
import Style from './mobile.module.less';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        true,
        {
            messages: EntityDict['message']['Schema'][];
        },
        {
            goDetailById: (id: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { messages, oakFullpath } = data;
    const { goDetailById } = methods;

    return (
        <div className={Style.container}>
            {messages?.length > 0 ? (
                <div>
                    {messages?.map((message, index: number) => (
                        <MessageCell
                            oakId={message.id}
                            key={message.id}
                            oakPath={
                                oakFullpath
                                    ? `${oakFullpath}.${message.id}`
                                    : ''
                            }
                            onItemClicked={(item: { id: string }) => {
                                goDetailById(item.id);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className={Style.noData}>
                    <Empty
                        description="暂无消息"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    ></Empty>
                </div>
            )}
        </div>
    );
}
