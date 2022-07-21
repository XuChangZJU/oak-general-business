import { NotificationProps } from 'oak-frontend-base';

export default OakComponent({
    async formData({ props }) {
        const { width } = props;
        const data = this.consumeNotification() as NotificationProps;
        if (data) {
            if (width === 'xs') {
                const Message = require('tdesign-mobile-react').Message;
                Message[data.type as any](
                    Object.assign(
                        {
                            icon: true,
                            duration: 5000,
                        },
                        data
                    )
                );
            }
            else {
                const MessagePlugin = require('tdesign-react').MessagePlugin;
                MessagePlugin[data.type as any](
                    Object.assign(
                        {
                            duration: 5000,
                        },
                        data
                    )
                );
            }
           
        }
        return {};
    },
    observers: {},
});
