"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection() {
        const userId = this.features.token.getUserId();
        return {
            id: 1,
            relationIds: 1,
            granterId: 1,
            granter: {
                id: 1,
                name: 1,
                nickname: 1,
            },
            userEntityClaim$ueg: {
                $entity: 'userEntityClaim',
                data: {
                    id: 1,
                    relationId: 1,
                },
                filter: {
                    userId,
                },
            },
            expired: 1,
            expiresAt: 1,
            relationEntity: 1,
            relationEntityFilter: 1,
            type: 1,
            qrCodeType: 1,
            granteeId: 1,
            redirectTo: 1,
        };
    },
    isList: false,
    formData({ data: userEntityGrant, features }) {
        const userId = features.token.getUserId(true);
        const granter = userEntityGrant?.granter;
        const type = userEntityGrant?.type;
        const entity = userEntityGrant?.relationEntity;
        const relationIds = userEntityGrant?.relationIds;
        const userEntityClaims = userEntityGrant?.userEntityClaim$ueg;
        return {
            relationIds,
            type,
            expired: userEntityGrant?.expired,
            expiresAt: userEntityGrant?.expiresAt,
            granter,
            entity,
            relationEntityFilter: userEntityGrant?.relationEntityFilter,
            userId,
            redirectTo: userEntityGrant?.redirectTo,
            id: userEntityGrant?.id,
            claimedIds: userEntityClaims && userEntityClaims.map(ele => ele.relationId),
        };
    },
    data: {
        redirectCounter: 0,
        hasConfirmed: false,
    },
    listeners: {
        redirectCounter(prev, next) {
            if (next.redirectCounter > 0) {
                setTimeout(() => {
                    this.setState({
                        redirectCounter: next.redirectCounter - 1,
                    });
                }, 1000);
            }
            else {
                this.redirectPage();
            }
        },
    },
    methods: {
        async handleConfirm() {
            /* await this.execute('confirm');
            // await this.features.cache.exec('confirmUserEntityGrant', {
            //     id: this.props.oakId,
            // });
            const { redirectTo } = this.state;
            if (redirectTo && Object.keys(redirectTo).length > 0) {
                this.setState({
                    redirectCounter: 5,
                    hasConfirmed: true,
                });
            } else {
                this.setState({
                    hasConfirmed: true,
                });
            } */
        },
        redirectPage() {
            const redirectTo = this.state
                .redirectTo;
            if (!redirectTo || Object.keys(redirectTo).length === 0) {
                return;
            }
            const { pathname, props, state, isTabBar } = redirectTo;
            const url = pathname.substring(0, 1) === '/' ? pathname : `/${pathname}`;
            if (isTabBar) {
                this.switchTab({
                    url,
                    ...(props || {}),
                }, state);
                return;
            }
            this.redirectTo({
                url,
                ...(props || {}),
            }, state);
        },
    },
});
