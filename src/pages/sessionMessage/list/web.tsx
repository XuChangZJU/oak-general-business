// import React, { useState, useEffect } from 'react';
// import { Button, Image, Popup } from 'antd-mobile';
// import { Input, Upload, Popover, Tag } from 'antd';

// import {
//     PlusCircleOutlined,
//     PictureFilled,
//     BookFilled,
//     CloseOutlined,
// } from '@ant-design/icons';
// import ConversationMessageCell from '@project/components/conversationMessage/cell';
// import ConversationHeader from '@project/components/conversation/forConversationMessage';
// import SendTradeCard from '@project/components/trade/detail/sendCard';
// import SendSkuCard from '@project/components/sku/sendSkuCard';
// import TradeList from '@project/pages/trade/byConversation/list';

// import Style from './mobile.module.less';

// import { WebComponentProps } from 'oak-frontend-base';
// import { EntityDict } from '@oak-app-domain';

// interface CustomFile {
//     name: string;
//     size: number;
//     type: string;
//     originFileObj: File;
// }

// export default function Render(
//     props: WebComponentProps<
//         EntityDict,
//         'conversationMessage',
//         true,
//         {
//             conversationMessageList: EntityDict['conversationMessage']['Schema'][];
//             content: string;
//             buttonHidden: boolean;
//             selectedTradeId: string;
//             conversationId: string;
//             userType: string;
//             isCombine: boolean;
//             companyId: string;
//             employerId: string;
//             tradeId: string;
//             skuId: string;
//         },
//         {
//             setButtonHidden: (isHidden: boolean) => void;
//             customUpload: (file: CustomFile) => void;
//             createTradeMessage: (id: string) => void;
//             createSkuMessage: (id: string) => void;
//             setContent: (content: string) => void;
//             pageScroll: (id: string) => void;
//             createMessage: () => void;
//         }
//     >
// ) {
//     const { data, methods } = props;
//     const {
//         oakFullpath,
//         oakPagination,
//         oakLoading,
//         oakExecuting,
//         conversationId,
//         userType,
//         conversationMessageList,
//         selectedTradeId,
//         content,
//         isCombine,
//         buttonHidden,
//         companyId,
//         employerId,
//         tradeId,
//         skuId,
//     } = data;
//     const {
//         setButtonHidden,
//         customUpload,
//         createTradeMessage,
//         createSkuMessage,
//         setContent,
//         pageScroll,
//         createMessage,
//     } = methods;
//     const { pageSize, total, currentPage } = oakPagination || {};
//     const [bottomHeight, setBottomHeight] = useState(0);
//     const [tradeListVisible, setTradeListVisible] = useState(false);
//     const [sendTdOpen, setSendTdOpen] = useState(true);
//     const [showCard, setShowCard] = useState(true);
//     const [showCard1, setShowCard1] = useState(true);
//     useEffect(() => {
//         if (buttonHidden) {
//             const dom = window.document.getElementById('bottom');
//             const newBottomHeight = dom && dom.offsetHeight || 0;
//             setBottomHeight(newBottomHeight);
//         } else {
//             setBottomHeight(0);
//         }
//     }, [buttonHidden]);
//     return conversationId ? (
//         <div className={Style.container}>
//             <ConversationHeader
//                 showBack={!isCombine}
//                 userType={userType}
//                 conversationId={conversationId}
//                 userId={employerId}
//             />
//             <div
//                 className={Style.inner}
//                 style={{
//                     marginBottom: bottomHeight ? `${bottomHeight}px` : '45px',
//                 }}
//                 id="comment"
//                 onClick={() => setButtonHidden(true)}
//             >
//                 {conversationMessageList
//                     ?.sort(
//                         (a, b) =>
//                             (a.$$createAt$$ as number) -
//                             (b.$$createAt$$ as number)
//                     )
//                     .map((conversationMessage, index: number) => {
//                         return (
//                             <ConversationMessageCell
//                                 key={conversationMessage.id}
//                                 oakId={conversationMessage.id}
//                                 oakPath={
//                                     oakFullpath
//                                         ? `${oakFullpath}.${conversationMessage.id}`
//                                         : undefined
//                                 }
//                                 userType={userType}
//                             />
//                         );
//                     })}
//             </div>
//             <div className={Style.bottom} id="bottom">
//                 {tradeId && showCard && (
//                     <SendTradeCard
//                         conversationId={conversationId}
//                         userType={userType}
//                         setShowCard={() => {
//                             setShowCard(false);
//                         }}
//                         setBottomHeight={() => {
//                             setBottomHeight(0);
//                         }}
//                         oakId={tradeId}
//                         oakAutoUnmount={true}
//                         oakPath={
//                             data.oakFullpath
//                                 ? `conversationMessage/list/trade/detail/sendCard`
//                                 : undefined
//                         }
//                         createTradeMessage={() => {
//                             createTradeMessage(tradeId);
//                         }}
//                     />
//                 )}
//                 {skuId && showCard1 && (
//                     <SendSkuCard
//                         conversationId={conversationId}
//                         userType={userType}
//                         setShowCard1={() => {
//                             setShowCard1(false);
//                         }}
//                         setBottomHeight={() => {
//                             setBottomHeight(0);
//                         }}
//                         oakId={skuId}
//                         oakAutoUnmount={true}
//                         oakPath={
//                             data.oakFullpath
//                                 ? `conversationMessage/list/sku/sendSkuCard`
//                                 : undefined
//                         }
//                         createSkuMessage={() => {
//                             createSkuMessage(skuId);
//                         }}
//                     />
//                 )}
//                 <div className={Style.textareaBox}>
//                     <Input.TextArea
//                         className={Style.textarea}
//                         rows={1}
//                         onChange={({ target: { value } }) => {
//                             setContent(value);
//                         }}
//                         onFocus={() => {
//                             setButtonHidden(true);
//                             setShowCard(false);
//                             setBottomHeight(0);
//                         }}
//                         value={content}
//                     />
//                     <div className={Style.action}>
//                         {content && (
//                             <Button
//                                 color="primary"
//                                 fill="solid"
//                                 size="middle"
//                                 disabled={!content}
//                                 onClick={() => {
//                                     createMessage();
//                                     pageScroll('comment');
//                                 }}
//                                 style={{ width: '56px', fontSize: '14px' }}
//                             >
//                                 发送
//                             </Button>
//                         )}
//                         {!content && (
//                             <PlusCircleOutlined
//                                 className={Style.plusIcon}
//                                 onClick={() => {
//                                     setButtonHidden(false);
//                                     setShowCard(false);
//                                 }}
//                             />
//                         )}
//                     </div>
//                 </div>
//                 {!buttonHidden && (
//                     <div className={Style.toolbar}>
//                         <div className={Style.button}>
//                             <Upload
//                                 accept={'image/*'}
//                                 multiple={false}
//                                 showUploadList={false}
//                                 onChange={({ file }) => {
//                                     customUpload(file as CustomFile);
//                                 }}
//                             >
//                                 <div className={Style.iconBox}>
//                                     <PictureFilled className={Style.icon} />
//                                 </div>
//                             </Upload>
//                             <div className={Style.text}>图片</div>
//                         </div>

//                         {['company', 'employer'].includes(userType) && (
//                             <>
//                                 <div
//                                     className={Style.button}
//                                     onClick={() => {
//                                         setTradeListVisible(true);
//                                     }}
//                                 >
//                                     <div className={Style.iconBox}>
//                                         <BookFilled className={Style.icon} />
//                                     </div>
//                                     <div className={Style.text}>订单</div>
//                                 </div>

//                                 <Popup
//                                     visible={tradeListVisible}
//                                     showCloseButton={true}
//                                     onMaskClick={() => {
//                                         setTradeListVisible(false);
//                                     }}
//                                     onClose={() => {
//                                         setTradeListVisible(false);
//                                     }}
//                                 >
//                                     <div className={Style.popup_title}>
//                                         <span className={Style.title}>
//                                             选择订单
//                                         </span>
//                                     </div>
//                                     <TradeList
//                                         companyId={companyId}
//                                         userId={employerId}
//                                         oakAutoUnmount={true}
//                                         oakPath={
//                                             oakFullpath
//                                                 ? '$$conversation-message/trade'
//                                                 : ''
//                                         }
//                                         setTradeId={(id: string) => {
//                                             setTradeListVisible(false);
//                                             createTradeMessage(id);
//                                         }}
//                                     />
//                                 </Popup>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     ) : (
//         <div className={Style.background}></div>
//     );
// }
