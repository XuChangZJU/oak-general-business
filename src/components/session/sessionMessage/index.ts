import { assert } from 'oak-domain/lib/utils/assert'

export default OakComponent({
    isList: false,
    lifetimes: {
        async ready() {
            const { sessionId, entity, entityId } = this.props;
            if (!sessionId) {
                assert(entity && entityId);
                const { result: newSessionId } = await this.features.cache.exec(
                    'createSession',
                    { type: 'web', entity, entityId }
                );
                this.setState({
                    newSessionId,
                });
            } else {
                this.setState({
                    newSessionId: sessionId,
                });
            }
        },
        detached() {

        },
    },
    properties: {
        sessionId: '' as string,
        entity: '' as string,
        entityId: '' as string
    }
});
