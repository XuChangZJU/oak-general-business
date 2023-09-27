"use strict";
// import React from 'react';
// import Style from './mobile.module.less';
// import ConversationHeader from '@project/components/conversation/header';
// import ConversationCell from '@project/components/conversation/cell';
// import ConversationMessageNumber from '@project/components/conversation/messageNumber';
// import { WebComponentProps } from 'oak-frontend-base';
// import { EntityDict } from '@oak-app-domain';
// export default function Render(
//     props: WebComponentProps<
//         EntityDict,
//         'conversation',
//         false,
//         {
//             conversations: EntityDict['conversation']['Schema'][];
//             selectedConversationId: string;
//             unReadConversation: number;
//             userType: string;
//         },
//         {
//             clearUnRead: () => void;
//             setSelectedConversationId: (conversationId: string) => void;
//             navigateToConversationMessage: (conversationId: string) => void;
//         }
//     >
// ) {
//     const { data, methods } = props;
//     const {
//         conversations,
//         selectedConversationId,
//         oakFullpath,
//         unReadConversation,
//         userType,
//     } = data;
//     const {
//         clearUnRead,
//         setSelectedConversationId,
//         navigateToConversationMessage,
//     } = methods;
//     return (
//         <div className={Style.container}>
//             <div className={Style.conversationContainer}>
//                 <ConversationHeader />
//                 <ConversationMessageNumber
//                     number={unReadConversation}
//                     clear={clearUnRead}
//                 />
//                 {conversations?.map((conversation: any, index: number) => {
//                     return (
//                         <ConversationCell
//                             userType={userType}
//                             selectedId={selectedConversationId}
//                             onSelect={(id: string) => {
//                                 navigateToConversationMessage(conversation.id);
//                             }}
//                             oakId={conversation.id}
//                             key={conversation.id}
//                             oakPath={
//                                 oakFullpath
//                                     ? `${oakFullpath}.${conversation.id}`
//                                     : ''
//                             }
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
