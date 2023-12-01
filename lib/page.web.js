"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
const page_web_1 = require("oak-frontend-base/es/page.web");
function createComponent(option, features) {
    const { lifetimes, methods, ...rest } = option;
    const { attached, ...restLifeTimes } = lifetimes || {};
    return (0, page_web_1.createComponent)({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                throw new Error('小程序环境专有函数在web下不成立');
            },
            ...methods,
        },
        lifetimes: {
            attached() {
                this.addFeatureSub('token', () => this.refresh());
                attached && attached.call(this);
            },
            ...restLifeTimes,
        },
        ...rest,
    }, features);
}
exports.createComponent = createComponent;
