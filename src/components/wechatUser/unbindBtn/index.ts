import { EntityDict } from '../../../oak-app-domain';


export default OakComponent({
    entity: 'wechatUser',
    isList: false,
    projection: {
        id: 1,
        userId: 1,
    },
    formData({ data }) {
        return {
            id: data?.id,
        }
    },
});
