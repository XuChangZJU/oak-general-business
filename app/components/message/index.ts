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

import { NotificationProps } from 'oak-frontend-base';

const MessageType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};

export default OakComponent({
    async formData({}) {
        const data = this.consumeNotification() as NotificationProps;
        if (data) {
            this[data.type as any](
                Object.assign(
                    {
                        offset: [20, 32],
                        icon: true,
                    },
                    data
                )
            );
        }
        return {};
    },
    observers: {},
    methods: {
        getInstance(context, selector = '#t-message') {
            const instance = context.selectComponent(selector);
            if (!instance) {
                return Promise.reject(
                    new Error('未找到Message组件, 请检查selector是否正确')
                );
            }
            return instance;
        },
        showMessage(options, theme = MessageType.info) {
            const instance = this.getInstance(this);
            instance.resetData(() => {
                instance.setData(
                    Object.assign({ theme }, options),
                    instance.show
                );
            });
            return instance;
        },
        info(options) {
            return this.showMessage(options, MessageType.info);
        },
        success(options) {
            return this.showMessage(options, MessageType.success);
        },
        warning(options) {
            return this.showMessage(options, MessageType.warning);
        },
        error(options) {
            return this.showMessage(options, MessageType.error);
        },
        hide() {
            const instance = this.getInstance(this);
            if (!instance) {
                return;
            }
            instance.hide();
        },
    },
});
