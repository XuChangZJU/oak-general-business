
export default OakComponent({
    isList: false,
    wechatMp: {
        externalClasses: ['oak-class'],
    },
    properties: {
        name: {
            type: String,
            value: '',
        },
        custom: {
            type: String,
            value: '',
        },
        size: {
            type: Number,
            value: 14,
        },
        color: {
            type: String,
            value: '',
        },
    },
});