import { generateNewId } from 'oak-domain/lib/utils/uuid';
export default OakComponent({
    entity: 'userEntityGrant',
    isList: false,
    properties: {
        picker: undefined,
        hideInfo: false,
        hideTip: false,
        afterClaim: undefined,
    },
    projection() {
        const userId = this.features.token.getUserId();
        return {
            id: 1,
            relationIds: 1,
            granterId: 1,
            rule: 1,
            ruleOnRow: 1,
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
            multiple: 1,
            redirectTo: 1,
        };
    },
    data: {
        pickedRowIds: [],
        pickedRelationIds: [],
        onPickRelationsMp(ids) {
            (this).onPickRelations(ids);
        },
        onPickRowsMp(ids) {
            (this).onPickRows(ids);
        }
    },
    formData({ data }) {
        const userId = this.features.token.getUserId();
        const isGranter = userId === data?.granterId;
        const hasClaimed = !!data?.userEntityClaim$ueg?.find((ele) => ele.userId === userId && ele.$$createAt$$ > 1);
        const { expiresAt } = data || {};
        let counter = expiresAt ? expiresAt - Date.now() : 0;
        const result = {
            userEntityGrant: data,
            isGranter,
            hasClaimed,
            counterStr: '',
            expired: counter <= 0,
        };
        if (counter > 0) {
            const h = Math.floor(counter / 1000 / 3600);
            const m = Math.floor(counter / 1000 / 60) % 60;
            const s = Math.floor(counter / 1000) % 60;
            result.counterStr = `${h >= 10 ? '' : '0'}${h}:${m >= 10 ? '' : '0'}${m}:${s >= 10 ? '' : '0'}${s}`;
            this.counterHandler = setTimeout(() => this.reRender(), 1000);
        }
        else {
            if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        return result;
    },
    methods: {
        setClaim() {
            const { pickedRelationIds, pickedRowIds } = this.state;
            if (pickedRelationIds.length > 0 && pickedRowIds.length > 0) {
                const userId = this.features.token.getUserId();
                this.update({
                    userEntityClaim$ueg: pickedRelationIds.map((relationId) => {
                        return pickedRowIds.map((rowId) => ({
                            id: generateNewId(),
                            action: 'create',
                            data: {
                                id: generateNewId(),
                                userId,
                                relationId,
                                claimEntityId: rowId,
                            },
                        }));
                    }).flat(),
                }, 'claim');
            }
            else {
                this.clean();
            }
        },
        onPickRows(ids) {
            this.setState({
                pickedRowIds: ids,
            }, () => this.setClaim());
        },
        onPickRelations(ids) {
            this.setState({
                pickedRelationIds: ids,
            }, () => this.setClaim());
        },
        async claim() {
            const { afterClaim } = this.props;
            const { userEntityGrant } = this.state;
            const { redirectTo } = userEntityGrant;
            await this.execute();
            if (afterClaim) {
                return afterClaim(userEntityGrant);
            }
            else if (redirectTo) {
                const { pathname, props = {}, state, isTabBar } = redirectTo;
                if (pathname) {
                    if (isTabBar) {
                        this.switchTab({
                            url: pathname,
                            ...props,
                        }, state);
                        return;
                    }
                    this.navigateTo({
                        url: pathname,
                        ...props,
                    }, state);
                    return;
                }
            }
            this.navigateTo({
                url: '/',
            });
        }
    }
});
