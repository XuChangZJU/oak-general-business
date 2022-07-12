// index.ts

import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakComponent({
    path: 'user:manage',
    entity: 'user',
    isList: true,
    formData: async ({ data: user }) => {
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
            user,
            nickname,
            name,
            mobile,
            avatar,
            userState,
        };
    },
    properties: {
        oakFullpath: String,
        oakParent: String,
        oakPath: String,
        oakId: String,
    },
    data: {
        stateColor: {
            shadow: 'orange',
            normal: 'green',
            disabled: 'red'
        }
    },
    methods: {
        async onCellClicked(event: any) {
            // resolveInput拿的是target，原来代码拿的是currentTarget
            this.pub(this.props.event, this.state.user);
        },
    },
});