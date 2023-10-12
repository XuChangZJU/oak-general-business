"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        async ready() {
            const { sessionId, entity, entityId } = this.props;
            if (!sessionId) {
                (0, assert_1.assert)(entity && entityId);
                const { result: newSessionId } = await this.features.cache.exec('createSession', { type: 'web', entity, entityId });
                this.setState({
                    newSessionId,
                });
            }
            else {
                this.setState({
                    newSessionId: sessionId,
                });
            }
        },
        detached() {
        },
    },
    properties: {
        sessionId: '',
        entity: '',
        entityId: ''
    }
});
