import { EntityDict } from '../../../general-app-domain';


export default OakComponent({
    entity: 'wechatUser',
    isList: true,
    projection: {
        id: 1,
    },
    formData({ data }) {
        return {
            wechatUsers: data?.filter((ele) => !!ele.userId),
        };
    },
    lifetimes: {
    },
    data: {
    },
    properties: {
    },
    methods: {
    },
});
