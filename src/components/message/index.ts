import { MessageProps } from 'oak-frontend-base/lib/types/Message';
import Message from '../../utils/message';

export default OakComponent({
    isList: false,
    async formData({ props }) {
        const { width } = props;
        const data = this.consumeMessage() as MessageProps;
        if (data) {
            const self = this;
            Message[data.type as MessageProps['type']](
                Object.assign(
                    {},
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
});
