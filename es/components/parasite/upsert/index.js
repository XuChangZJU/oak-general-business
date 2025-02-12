import { generateNewId } from 'oak-domain/lib/utils/uuid';
export default OakComponent({
    entity: 'parasite',
    isList: false,
    data: {
        period: 7,
        parasiteId: '',
        options: [],
        searchValue: '',
    },
    properties: {
        entity: '',
        entityId: '',
        relation: '',
        redirectTo: undefined,
        multiple: false,
        nameLabel: '',
        nameRequired: true
    },
    lifetimes: {
        ready() { },
    },
    formData: ({ data }) => {
        return {
            userId: data?.userId,
            user: data?.user,
        };
    },
    methods: {
        async onSearch(value) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.search(value);
            }, 500);
        },
        async search(value) {
            while (value.indexOf("'") !== -1) {
                value = value.replace("'", '');
            }
            if (!value) {
                this.setState({
                    options: []
                });
                return;
            }
            const { entity, entityId, relation } = this.props;
            const { data } = await this.features.cache.refresh('user', {
                data: {
                    id: 1,
                    userState: 1,
                    nickname: 1,
                },
                filter: {
                    nickname: {
                        $startsWith: value,
                    },
                    userState: 'shadow',
                    userRelation$user: {
                        relation: {
                            name: relation,
                        },
                        entityId,
                    }
                },
            });
            this.setState({
                options: data.map((ele) => ({
                    id: ele.id,
                    value: ele.nickname,
                })),
            });
        },
        onSelect(value) {
            const option = this.state.options?.find((ele) => ele.value === value);
            if (option) {
                this.setState({
                    userId: option.id,
                });
            }
            else {
                this.setState({
                    userId: '',
                });
            }
        },
        setSearchValue(value) {
            this.setState({
                searchValue: value,
            });
        },
        setPeriod(period) {
            this.setState({
                period,
            });
        },
        setInit() {
            this.setState({
                parasiteId: '',
                userId: '',
                searchValue: '',
                period: 7,
            });
        },
        async confirm() {
            const { entityId, entity, redirectTo, relation, multiple, nameRequired, nameLabel } = this.props;
            const { period, userId, searchValue } = this.state;
            let nickname = searchValue;
            const time = period * 24 * 60 * 60 * 1000;
            if (nameRequired) {
                if (!userId && !searchValue) {
                    this.setMessage({
                        type: 'error',
                        content: `请输入${nameLabel || '名称'}`,
                    });
                    return;
                }
            }
            else {
                nickname = searchValue || 'shadow_user';
            }
            if (!period) {
                this.setMessage({
                    type: 'error',
                    content: '请选择',
                });
                return;
            }
            const userRelation = `userRelation`;
            const userRelationRelativePath = `${userRelation}$user`;
            if (userId) {
                this.update({
                    userId: userId,
                });
            }
            else {
                const relationId = await this.features.relationAuth.getRelationIdByName(entity, relation);
                this.update({
                    user: {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            nickname: nickname,
                            [`${userRelationRelativePath}`]: [
                                {
                                    id: generateNewId(),
                                    action: 'create',
                                    data: {
                                        id: generateNewId(),
                                        entityId,
                                        entity,
                                        relationId: relationId
                                    },
                                },
                            ],
                        },
                    },
                });
            }
            this.update({
                entityId,
                entity,
                expiresAt: Date.now() + time,
                expired: false,
                redirectTo,
                multiple: multiple,
                showTip: false,
                tokenLifeLength: time,
            });
            const id = this.getId();
            await this.execute();
            this.setState({
                parasiteId: id,
            });
        },
    },
});
