"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
const page_web_1 = require("oak-frontend-base/es/page.web");
function createComponent(option, features) {
    const { methods, features: optionFeatures, userInsensitive, ...rest } = option;
    const tokenFeatures = optionFeatures?.find(ele => ele === 'token' || (typeof ele === 'object' && ele.feature === 'token'));
    return (0, page_web_1.createComponent)({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                throw new Error('小程序环境专有函数在web下不成立');
            },
            ...methods,
        },
        features: (userInsensitive || !!tokenFeatures) ? optionFeatures : (optionFeatures || []).concat([{
                feature: 'token',
                behavior: 'refresh'
            }]),
        ...rest,
    }, features);
}
exports.createComponent = createComponent;
