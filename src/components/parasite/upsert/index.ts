import { EntityDict } from '../../../general-app-domain';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';

export default OakComponent({
    entity: 'parasite',
    isList: false,
    data: {
        period: 7,
        parasiteId: '',
        options: [] as { id: string; value: string }[],
        searchValue: '',
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relation: '',
        redirectTo: undefined as
            | EntityDict['parasite']['Schema']['redirectTo']
            | undefined,
        multiple: false,
        nameLabel: '',
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
        async onSearch(value: string) {
            if ((this as any).timer) {
                clearTimeout((this as any).timer)
            }
            (this as any).timer = setTimeout(() => {
                this.search(value);
            }, 500);
        },
        async search(value: string) {
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
            const userRelation = `user${firstLetterUpperCase(entity!)}`;
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
                    id: {
                        $in: {
                            entity: userRelation,
                            data: {
                                userId: 1,
                            },
                            filter: {
                                relation,
                                [`${entity}Id`]: entityId,
                            },
                        },
                    },
                },
            });

            this.setState({
                options: data.map((ele) => ({
                    id: ele.id!,
                    value: ele.nickname!,
                })),
            });
        },
        onSelect(value: string) {
            const option = this.state.options?.find(
                (ele) => ele.value === value
            );
            if (option) {
                this.setState({
                    userId: option.id,
                });
            } else {
                this.setState({
                    userId: '',
                });
            }
        },
        setSearchValue(value: string) {
            this.setState({
                searchValue: value,
            });
        },
        setPeriod(period: number) {
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
        confirm() {
            const { entityId, entity, redirectTo, relation, multiple } =
                this.props;
            const { period, userId, searchValue } = this.state;

            const time = period * 24 * 60 * 60 * 1000;
            if (!userId && !searchValue) {
                this.setMessage({
                    type: 'error',
                    content: '请输入名称',
                });
                return;
            }

            if (!period) {
                this.setMessage({
                    type: 'error',
                    content: '请选择',
                });
                return;
            }
            const userRelation = `user${firstLetterUpperCase(entity!)}`;

            const userRelationRelativePath = `${userRelation}$user`;

            if (userId) {
                this.update({
                    userId: userId,
                });
            } else {
                this.update({
                    user: {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            nickname: searchValue,

                            [`${userRelationRelativePath}`]: [
                                {
                                    id: generateNewId(),
                                    action: 'create',
                                    data: {
                                        id: generateNewId(),
                                        relation: relation,
                                        [`${entity}Id`]: entityId,
                                    },
                                },
                            ],
                        },
                    },
                } as any);
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
            this.execute();
            this.setState({
                parasiteId: id,
            });
        },
    },
});
