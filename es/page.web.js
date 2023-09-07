import { createComponent as createBaseComponent } from 'oak-frontend-base/es/page.web';
export function createComponent(option, features) {
    const { lifetimes, methods, ...rest } = option;
    const { attached, ...restLifeTimes } = lifetimes || {};
    return createBaseComponent({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                throw new Error('小程序环境专有函数在web下不成立');
            },
            ...methods,
        },
        lifetimes: {
            attached() {
                this.subscribed.push(this.features.token.subscribe(() => this.refresh()));
                attached && attached.call(this);
            },
            ...restLifeTimes,
        },
        ...rest,
    }, features);
}
