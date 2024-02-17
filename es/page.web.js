import { createComponent as createBaseComponent } from 'oak-frontend-base/es/page.web';
export function createComponent(option, features) {
    const { methods, features: optionFeatures, userInsensitive, ...rest } = option;
    const tokenFeatures = optionFeatures?.find(ele => ele === 'token' || (typeof ele === 'object' && ele.feature === 'token'));
    return createBaseComponent({
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
