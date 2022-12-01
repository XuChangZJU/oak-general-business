import { MessageProps } from 'oak-frontend-base/lib/types/Message';
import Message from '../../utils/message';

export default OakComponent({
    isList: false,
    formData({ props }) {
         const data = this.consumeMessage() as MessageProps;
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            if (data) {
                const self = this;
                Message[data.type as MessageProps['type']](
                    Object.assign(
                        {
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
