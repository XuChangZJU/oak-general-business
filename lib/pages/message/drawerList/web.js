"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var cell_1 = tslib_1.__importDefault(require("../../../components/message/cell"));
var empty_1 = tslib_1.__importDefault(require("../../../components/common/empty"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var messages = data.messages, open = data.open, onClose = data.onClose, oakFullpath = data.oakFullpath;
    var goDetailById = methods.goDetailById, goMessageList = methods.goMessageList;
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
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (messages === null || messages === void 0 ? void 0 : messages.length) > 0 ? ((0, jsx_runtime_1.jsx)("div", { children: messages === null || messages === void 0 ? void 0 : messages.map(function (message, index) { return ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: message.id, oakPath: oakFullpath
                    ? "".concat(oakFullpath, ".").concat(message.id)
                    : '', onItemClicked: function (item) {
                    var id = item.id;
                    onClose && onClose();
                    goDetailById(id);
                } }, message.id)); }) })) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.noData }, { children: (0, jsx_runtime_1.jsx)(empty_1.default, { description: "\u6682\u65E0\u6D88\u606F", image: empty_1.default.PRESENTED_IMAGE_SIMPLE }) }))) })));
}
exports.default = Render;
