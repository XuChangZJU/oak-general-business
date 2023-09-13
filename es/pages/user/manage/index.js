// index.ts
export default OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
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
                entityId: 1,
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
    sorters: [
        {
            sorter: () => ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            }),
        },
    ],
    isList: true,
    formData: function ({ data: users, features }) {
        const userArr = users.map((user) => {
            const { id, nickname, userState, name, mobile$user, extraFile$entity, } = user || {};
            const mobile = mobile$user && mobile$user[0]?.mobile;
            const avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
            return {
                id,
                nickname,
                name,
                mobile,
                avatar,
                userState,
            };
        });
        const isRoot = features.token.isReallyRoot();
        return {
            userArr,
            isRoot,
        };
    },
    properties: {
        event: '',
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: 'danger',
        },
    },
    methods: {
        async bindClicked(input) {
            // resolveInput拿的是target，原来代码拿的是currentTarget
            const { dataset } = this.resolveInput(input);
            const { id } = dataset;
            this.onCellClicked(id);
        },
        async onCellClicked(id) {
            const { event } = this.props;
            if (event) {
                this.pubEvent(event, this.state.userArr.find((ele) => ele.id === id));
            }
            else {
                this.navigateTo({
                    url: '/user/manage/detail',
                    oakId: id,
                });
            }
        },
        goNewUser() {
            this.navigateTo({
                url: '/user/manage/upsert',
            });
        },
    },
    lifetimes: {
        detached() {
            this.unsubAllEvents(this.props.event);
        },
    },
});
