import React from 'react';
import Style from './web.module.less';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            messages: EntityDict['message']['Schema'][];
            onClose: () => void;
            open: boolean;
        },
        {
            goDetailById: (id: string) => void;
            goMessageList: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { messages, open, onClose, oakFullpath } = data;
    const { goDetailById, goMessageList } = methods;

    return (
        <>
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
                                const { id } = item;
                                onClose && onClose();
                                goDetailById(id);
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
        </>
    );
}
