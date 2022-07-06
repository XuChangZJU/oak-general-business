// index.ts

import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakPage({
    path: 'user:manage',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                type: 1,
                entity: 1,
                extension: 1,
            },
            filter: {
                tag1: 'avatar',
            },
            indexFrom: 0,
            count: 1,
        },
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
        },
    },
    isList: true,
    formData: async ({ data: users }) => {
        const userData = users.map((user) => {
            const {
                id,
                nickname,
                userState,
                name,
                mobile$user,
                extraFile$entity,
            } = user || {};
            const mobile = mobile$user && mobile$user[0]?.mobile;
            const avatar =
                extraFile$entity &&
                extraFile$entity[0] &&
                composeFileUrl(extraFile$entity[0]);
            return {
                id,
                nickname,
                name,
                mobile,
                avatar,
                userState,
            };
        });
        return {
            userData,
        };
    },
    properties: {
        event: String,
    },
    methods: {
        async onCellClicked(input: any) {
            // resolveInput拿的是target，原来代码拿的是currentTarget
            const { dataset } = this.resolveInput(input);
            const { id } = dataset!;
<<<<<<< HEAD
            this.pub(this.props.event, this.state.userData.find(ele => ele.id === id));
=======
            this.navigateTo({
                url: '/pages/user/manage/detail/index',
                oakId: id,
            });
>>>>>>> 418c883d600916aa8c0a11f6f746bcd030b92037
        },
        goNewUser() {
            this.navigateTo({
                url: '/pages/user/manage/upsert/index',
            });
        },
    },
    lifetimes: {
        detached() {
            this.unsubAll(this.props.event);
        },
    }
});