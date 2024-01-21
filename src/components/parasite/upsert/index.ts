import { EntityDict } from '../../../oak-app-domain';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';

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
        async confirm() {
            const { entityId, entity, redirectTo, relation, multiple, nameRequired, nameLabel } =
                this.props;
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
            } else {
                nickname = searchValue || 'shadow_user'
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
            } else {
                const relationId = await this.features.relationAuth.getRelationIdByName(
                    entity!,
                    relation!
                )!;
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
            await this.execute();
            this.setState({
                parasiteId: id,
            });
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        false,
        {
            entity: keyof ED2,
            entityId: string,
            relation: string,
            redirectTo: EntityDict['parasite']['Schema']['redirectTo'],
            multiple: boolean,
            nameLabel: string,
            nameRequired: boolean
        }
    >
) => React.ReactElement;
