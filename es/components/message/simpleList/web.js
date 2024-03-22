import React from 'react';
import Style from './web.module.less';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';
export default function Render(props) {
    const { data, methods } = props;
    const { messages, open, onClose, oakFullpath } = data;
    const { goDetailById, goMessageList } = methods;
    return (<>
            {messages?.length > 0 ? (<div>
                    {messages?.map((message, index) => (<MessageCell oakId={message.id} key={message.id} onItemClicked={(item) => {
                    const { id } = item;
                    onClose && onClose();
                    goDetailById(id);
                }} title={message.title} router={message.router} id={message.id} visitState={message.visitState} $$createAt$$={message.$$createAt$$} visit={(id) => {
                    methods.updateItem({}, id, 'visit');
                    methods.execute(undefined, false);
                }}/>))}
                </div>) : (<div className={Style.noData}>
                    <Empty description="暂无消息" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                </div>)}
        </>);
}
