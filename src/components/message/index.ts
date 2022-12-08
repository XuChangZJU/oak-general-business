import { MessageProps } from 'oak-frontend-base/lib/types/Message';

export default OakComponent({
    isList: false,
    formData({ props }) {
        const data = this.consumeMessage() as MessageProps;
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            if (data) {
                // lin-ui的message: https://doc.mini.talelin.com/component/response/message.html
                (wx as any).lin.showMessage({
                    type:
                        data.type === 'info'
                            ? 'primary'
                            : data.type || 'primary',
                    content: data.content,
                    icon: data.icon,
                    duration: data.duration,
                });
            }
            return {};
        }

        return {
            data,
        };
    },
    lifetimes: {
        attached() {
            this.subscribed!.push(
                this.features.message.subscribe(
                    () => this.reRender()
                )
            );
        }
    }
});
