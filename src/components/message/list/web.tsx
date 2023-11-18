import React from 'react';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';


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
        <>
            {messages?.length > 0 ? (
                <div>
                    {messages?.map((message, index: number) => (
                        <MessageCell
                            oakId={message.id}
                            key={message.id}
                            onItemClicked={(item: { id: string }) => {
                                goDetailById(item.id);
                            }}
                            title={message.title}
                            router={message.router}
                            id={message.id}
                            visitState={message.visitState}
                            visit={(id: string) => {
                                methods.updateItem({
                                }, id, 'visit');
                                methods.execute(undefined, false);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <Empty
                    description="暂无消息"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                ></Empty>
            )}
        </>
    );
}
