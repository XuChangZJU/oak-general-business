import { createComponent as createBaseComponent } from 'oak-frontend-base/es/page.native';
export function createComponent(option, features) {
    const { methods, features: optionFeatures, userInsensitive, ...rest } = option;
    const tokenFeatures = optionFeatures?.find(ele => ele === 'token' || (typeof ele === 'object' && ele.feature === 'token'));
    return createBaseComponent({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                throw new Error('小程序环境专有函数在native下不成立');
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
