// import { concat, without } from 'lodash';
// import { NotificationProps } from 'oak-frontend-base';

// interface TimedNotificationdata extends NotificationProps {
//     dieAt: number;
// }

// let KILLER: NodeJS.Timeout | undefined = undefined;
// export default OakComponent({
//     data: {
//         messages: [] as TimedNotificationdata[],
//     },
//     async formData({}) {
//         const data = this.consumeNotification();
//         if (data) {
//             const now = Date.now();
//             return {
//                 messages: [
//                     ...this.state.messages,
//                     Object.assign(data, {
//                         dieAt: now + (data.duration || 3000),
//                     }),
//                 ],
//             };
//         }
//         return {};
//     },
//     observers: {
//         messages(messages: TimedNotificationdata[]) {
//             if (messages.length > 0) {
//                 let firstDieAt: number = Number.MAX_VALUE;
//                 let vicitim: TimedNotificationdata;
//                 for (const message of messages) {
//                     if (message.dieAt < firstDieAt) {
//                         vicitim = message;
//                         firstDieAt = vicitim.dieAt;
//                     }
//                 }

//                 if (KILLER) {
//                     clearTimeout(KILLER);
//                 }
//                 KILLER = setTimeout(
//                     () => {
//                         const messages = without(this.state.messages, vicitim);
//                         this.setState({
//                             messages,
//                         });
//                     }
//                 , Math.max(firstDieAt - Date.now(), 0));
//             }
//             else {
//                 KILLER = undefined;
//             }
//         },
//     },
// });

import { NotificationProps } from 'oak-frontend-base/lib/types/Notification';
import Message from '../../utils/message';

export default OakComponent({
    async formData({ props }) {
        const { width } = props;
        const data = this.consumeNotification() as NotificationProps;
        if (data) {
            const self = this;
            Message[data.type as NotificationProps['type']](
                Object.assign(
                    {},
                    width === 'xs' && {
                        //处理mobile
                        icon: true,
                    },
                    process.env.OAK_PLATFORM === 'wechatMp' && {
                        // 处理小程序
                        offset: [20, 32],
                        icon: true,
                        context: self,
                    },
                    data
                )
            );
        }
        return {};
    },
    observers: {},
    methods: {

    },
});
