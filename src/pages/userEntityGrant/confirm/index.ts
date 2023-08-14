import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { EntityDict } from '../../../oak-app-domain';

export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relationId: 1,
        relation: {
            id: 1,
            name: 1,
            display: 1,
        },
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
            nickname: 1,
        },
        expired: 1,
        expiresAt: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        qrCodeType: 1,
        granteeId: 1,
        number: 1,
        confirmed: 1,
        redirectTo: 1,
    },
    isList: false,
    formData({ data: userEntityGrant, features }) {
        const userId = features.token.getUserId(true);
        const granter = userEntityGrant?.granter;
        const type = userEntityGrant?.type;
        const relation = userEntityGrant?.relation;
        const entity = userEntityGrant?.entity;
        const relationId = userEntityGrant?.relationId;

        return {
            relation,
            relationId,
            type,
            expired: userEntityGrant?.expired,
            expiresAt: userEntityGrant?.expiresAt,
            granter,
            entity,
            entityId: userEntityGrant?.entityId,
            granteeId: userEntityGrant?.granteeId,
            number: userEntityGrant?.number,
            confirmed: userEntityGrant?.confirmed,
            userId,
            redirectTo: userEntityGrant?.redirectTo,
        };
    },
    data: {
        redirectCounter: 0,
        hasConfirmed: false,
        loading: true,
    },
    listeners: {
        redirectCounter(prev, next) {
            if (next.redirectCounter > 0) {
                setTimeout(() => {
                    this.setState({
                        redirectCounter: next.redirectCounter - 1,
                    });
                }, 1000);
            } else {
                this.redirectPage();
            }
        },
    },
    methods: {
        async getUserRelations() {
            // 检查当前登陆者跟该授权实体缩手所受relation有关系了(todo)
            const { entity, entityId, relationId} = this.state;
            const userId = this.features.token.getUserId(true);
            if (!userId) {
                return;
            }
            const { oakId } = this.props;
            const { data } = await this.features.cache.refresh(
                'userRelation',
                {
                    data: {
                        id: 1,
                        userId: 1,
                        relationId: 1,
                    },
                    filter: {
                        userId,
                        relationId,
                        entity,
                        entityId,
                    },
                }
            );
            this.setState({
                hasConfirmed: data.length > 0,
            });
        },
        async handleConfirm() {
            await this.execute('confirm');
            const { redirectTo } = this.state;
            if (redirectTo) {
                this.setState({
                    redirectCounter: 5,
                    hasConfirmed: true,
                });
            } else {
                this.setState({
                    hasConfirmed: true,
                });
            }
        },
        redirectPage() {
            const redirectTo = this.state
                .redirectTo as EntityDict['userEntityGrant']['Schema']['redirectTo'];
            if (!redirectTo) {
                this.setMessage({
                    type: 'error',
                    content: '未配置跳转页面',
                });
                return;
            }
            const { pathname, props, state, isTabBar } = redirectTo;
            const url =
                pathname.substring(0, 1) === '/' ? pathname : `/${pathname}`;

            if (isTabBar) {
                this.switchTab(
                    {
                        url,
                        ...(props || {}),
                    },
                    state
                );
                return;
            }   
            this.redirectTo(
                {
                    url,
                    ...(props || {}),
                },
                state
            );
        },
    },
});
