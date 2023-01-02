export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
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
        granteeId: 1,
        number: 1,
        confirmed: 1,
        redirectTo: 1,
    },
    isList: false,
    formData({ data: userEntityGrant, features }) {
        const userId = features.token.getUserId(true);
        return {
            relation: userEntityGrant?.relation,
            type: userEntityGrant?.type,
            expired: userEntityGrant?.expired,
            expiresAt: userEntityGrant?.expiresAt,
            granter: userEntityGrant?.granter,
            entity: userEntityGrant?.entity,
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
    },
    observers: {
        redirectCounter(value) {
            if (value > 0) {
                setTimeout(() => {
                    this.setState({
                        redirectCounter: value - 1,
                    });
                }, 1000);
            }
            else {
                this.redirectMp();
            }
        }
    },
    methods: {
        async handleConfirm() {
            await this.execute('confirm');
            const { redirectTo } = this.state;
            if (redirectTo) {
                this.setState({
                    redirectCounter: 5,
                    hasConfirmed: true,
                });
            }
            else {
                this.setState({
                    hasConfirmed: true,
                });
            }
        },
        redirectMp() {
            const { redirectTo } = this.props;
            const { url, props = {}} = redirectTo;
            this.redirectTo({
                url,
                ...props,
            });
        }
    },
});
