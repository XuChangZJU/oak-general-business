import { EntityDict } from '../../../oak-app-domain';


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
});
