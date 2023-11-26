"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
const page_native_1 = require("oak-frontend-base/es/page.native");
function createComponent(option, features) {
    const { lifetimes, methods, ...rest } = option;
    const { attached, ...restLifeTimes } = lifetimes || {};
    return (0, page_native_1.createComponent)({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                throw new Error('小程序环境专有函数在native下不成立');
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
exports.createComponent = createComponent;
