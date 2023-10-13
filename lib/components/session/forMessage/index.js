"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    formData({ data, features }) {
        const { sessionId } = this.props;
        if (sessionId) {
            this.getSession(sessionId);
        }
        return {};
    },
    lifetimes: {
        ready() { },
    },
    listeners: {
        sessionId(prev, next) {
            if (prev.sessionId !== next.sessionId) {
                this.getSession(next.sessionId);
            }
        },
    },
    properties: {
        sessionId: '',
        isEntity: false,
        entityDisplay: (data) => [],
        entityProjection: null, // user端，指示需要取哪些entity的属性来显示entityDisplay
    },
    methods: {
        getSession(sessionId) {
            const { entityProjection } = this.props;
            const [session] = this.features.cache.get('session', {
                data: {
                    id: 1,
                    user: {
                        id: 1,
                        name: 1,
                        nickname: 1,
                        mobile$user: {
                            $entity: 'mobile',
                            data: {
                                id: 1,
                                mobile: 1,
                                userId: 1,
                            },
                        },
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
                                extension: 1,
                                type: 1,
                                entity: 1,
                            },
                            filter: {
                                tag1: {
                                    $in: ['avatar'],
                                },
                            },
                        },
                    },
                    ...entityProjection,
                },
                filter: {
                    id: sessionId
                }
            });
            this.setState({ session });
        },
        getAvatarUrl() {
            const { userUrl, entity } = this.state;
            const { isEntity } = this.props;
            const defaultUrl = 'data:image/png;base64,UklGRoICAABXRUJQVlA4IHYCAADwKACdASosASwBPrVarU8nJiUiJJjIEOAWiWlu4XShG/NX+q91/WYL37Uns/lNhNG6y8oBCkjJGSMkZIyRkjJGSMkZIyRkjJGSMkZIyRkjJGR8IMX6z+YtjIoxEY3KVOOQSyXEuJcR/ZAAHyQcUpZRWfL4lxLiXBnkSU0B4NcCHWSK4CBdk6WS4PC/jULN2pAeRlwRqF2xCZ400cTnW2ogZi8OtcthRiMouvr2dYEgJARhbEb+09k94h/a5mFkC7J2To60i1IWmYHR5OLiXEuJcSAK9Xk4C8ve/Uq7iBoiHvSAkBH4KrcZKm3UErOOpxquA3X2PWjC2wI/Dz57QAZ5J2Tsl6p+Eiy4BhYvDwpoChtMjLgEdPjq37JfS+Rm/7niuhE0jzkyk7jDjACsogklFiMtpkZfbolR4QRN7J2TsnZOydk7J2TsnZOydk7J0YAA/v67qQMAOmxdZAbD1n8UzeBoApiFopfRVxPpEh3G4wAp0EwQD6kJbi6xm8OOhiuS4WeYZ8hxC45E4PZfT56WVnzaLLWW1i9XLyz05YJhxQ6iT5aOk5J1rNnENlAzf+i/0WpEd/edFMYu+q2U4pBjLEoLPE0DGVeHtS7zt4vTVCiXBfibW0mgqhbRQhDrr5ctACqSBsx+8f/HDobGN621bjYch19yGQegV6eUMGNu9bVQi+vQdZvTK4d7MtISka7dqmVYfuI3Z6nUBA/Nzg0ApEhQ+CAmDvSRrKCjxbJBYdc+MsQpTv0DdUkoDVa18rZrKyIeUT4pYRFJcnsT+OoAJGGIdRGn6A4NtB3woJnI/x3d+Rgibkn5GcX4oAfaVqkvAAAAAAA=';
            if (isEntity) {
                return userUrl || defaultUrl;
            }
            else {
                return defaultUrl;
            }
        },
        getName() {
            const { session, entity } = this.state;
            const { isEntity, entityDisplay } = this.props;
            if (isEntity) {
                const userName = session?.user?.name;
                const userNickname = session?.user?.name || session?.user?.nickname;
                const userMobile = session?.user?.mobile$user &&
                    session?.user?.mobile$user[0]?.mobile;
                if (userName) {
                    return userName;
                }
                if (userMobile) {
                    return '用户' + userMobile;
                }
                return userNickname;
            }
            else {
                if (entityDisplay && session) {
                    const sessions = entityDisplay([session]);
                    return sessions[0]?.name;
                }
                return '未知';
            }
        },
    },
});
