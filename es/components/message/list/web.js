import React from 'react';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';
export default function Render(props) {
    const { data, methods } = props;
    const { messages, oakFullpath } = data;
    const { goDetailById } = methods;
    return (<>
            {messages?.length > 0 ? (<div>
                    {messages?.map((message, index) => (<MessageCell oakId={message.id} key={message.id} onItemClicked={(item) => {
                    goDetailById(item.id);
                }} title={message.title} router={message.router} id={message.id} visitState={message.visitState} $$createAt$$={message.$$createAt$$} visit={(id) => {
                    methods.updateItem({}, id, 'visit');
                    methods.execute(undefined, false);
                }}/>))}
                </div>) : (<Empty description="暂无消息" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>)}
        </>);
}
