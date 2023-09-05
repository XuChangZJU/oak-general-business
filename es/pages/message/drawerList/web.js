import { jsx as _jsx } from "react/jsx-runtime";
import Style from './web.module.less';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';
export default function Render(props) {
    const { data, methods } = props;
    const { messages, open, onClose, oakFullpath } = data;
    const { goDetailById, goMessageList } = methods;
    // return (
    //     <Drawer
    //         title="消息"
    //         placement="right"
    //         onClose={onClose}
    //         open={open}
    //         extra={
    //             <Space>
    //                 <Button
    //                     size="small"
    //                     type="text"
    //                     onClick={() => {
    //                         onClose && onClose();
    //                         goMessageList();
    //                     }}
    //                 >
    //                     查看更多
    //                 </Button>
    //             </Space>
    //         }
    //         bodyStyle={{
    //             padding: 0,
    //         }}
    //         destroyOnClose={true}
    //     >
    //         <div className={Style.container}>
    //             {messages?.length > 0 ? (
    //                 <div>
    //                     {messages?.map((message, index: number) => (
    //                         <MessageCell
    //                             oakId={message.id}
    //                             key={message.id}
    //                             oakPath={
    //                                 oakFullpath
    //                                     ? `${oakFullpath}.${message.id}`
    //                                     : ''
    //                             }
    //                             onItemClicked={(item: {
    //                                 id: string;
    //                             }) => {
    //                                 const { id } = item;
    //                                 onClose && onClose();
    //                                 goDetailById(id);
    //                             }}
    //                         />
    //                     ))}
    //                 </div>
    //             ) : (
    //                 <div className={Style.noData}>
    //                     <Empty
    //                         description="暂无消息"
    //                         image={Empty.PRESENTED_IMAGE_SIMPLE}
    //                     ></Empty>
    //                 </div>
    //             )}
    //         </div>
    //     </Drawer>
    // );
    return (_jsx("div", { className: Style.container, children: messages?.length > 0 ? (_jsx("div", { children: messages?.map((message, index) => (_jsx(MessageCell, { oakId: message.id, oakPath: oakFullpath
                    ? `${oakFullpath}.${message.id}`
                    : '', onItemClicked: (item) => {
                    const { id } = item;
                    onClose && onClose();
                    goDetailById(id);
                } }, message.id))) })) : (_jsx("div", { className: Style.noData, children: _jsx(Empty, { description: "\u6682\u65E0\u6D88\u606F", image: Empty.PRESENTED_IMAGE_SIMPLE }) })) }));
}
