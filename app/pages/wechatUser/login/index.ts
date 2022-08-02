import { EntityDict } from 'general-app-domain';

export default OakPage({
    path: 'wechatUser:login',
    isList: false,
    formData: async ({ data }) => {
        return {};
    },
    properties: {
        type: String,
    },
    data: {},
    lifetimes: {
        ready() {

        },
    },
    methods: {
        async login() {
        },
    },
});