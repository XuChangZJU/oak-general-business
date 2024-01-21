import { assert } from 'oak-domain/lib/utils/assert';
export default OakComponent({
    isList: false,
    formData({ features }) {
        const ids = this.getEfIds();
        const states = ids.map((id) => features.extraFile.getFileState(id));
        let state = 'uploaded';
        states.forEach((ele) => {
            if (ele) {
                if (['failed', 'local'].includes(ele.state)) {
                    state = ele.state;
                } else if (ele.state === 'uploading' && state === 'uploaded') {
                    state = 'uploading';
                }
            }
        });
        return {
            state,
        };
    },
    properties: {
        action: undefined,
        size: 'middle',
        block: false,
        type: 'primary',
        executeText: '',
        buttonProps: {},
        afterCommit: undefined,
        beforeCommit: undefined,
        messageProps: undefined,
    },
    listeners: {
        action(prev, next) {
            if (next.action !== prev.action) {
                this.update({}, next.action || 'update');
            }
        },
    },
    data: {
        failureIds: undefined,
        currentId: undefined,
    },
    lifetimes: {
        ready() {
            const { action } = this.props;
            if (action) {
                this.update({}, action);
            }
        },
    },
    methods: {
        getEfIds() {
            const entity = this.features.runningTree.getEntity(
                this.state.oakFullpath
            );
            const operations = this.features.runningTree.getOperations(
                this.state.oakFullpath
            );
            const efIds = [];
            const getRecursive = (e, o) => {
                const { action, data } = o;
                if (e === 'extraFile') {
                    if (action === 'create') {
                        assert(!(data instanceof Array));
                        efIds.push(data.id);
                    }
                    return;
                }
                for (const attr in data) {
                    const rel = this.features.cache.judgeRelation(e, attr);
                    if (rel === 2) {
                        assert(
                            typeof data[attr] === 'object' &&
                                !(data[attr] instanceof Array)
                        );
                        getRecursive(attr, data[attr]);
                    } else if (typeof rel === 'string') {
                        assert(
                            typeof data[attr] === 'object' &&
                                !(data[attr] instanceof Array)
                        );
                        getRecursive(rel, data[attr]);
                    } else if (rel instanceof Array) {
                        const [e2] = rel;
                        if (data[attr] instanceof Array) {
                            data[attr].forEach((o2) => getRecursive(e2, o2));
                        } else {
                            getRecursive(e2, data[attr]);
                        }
                    }
                }
            };
            if (operations instanceof Array) {
                operations.forEach((ele) =>
                    getRecursive(entity, ele.operation)
                );
            }
            return efIds;
        },
        async upload(ids) {
            if (ids.length === 0) {
                return;
            }
            const promises = [];
            const failureIds = [];
            const entity = this.features.runningTree.getEntity(
                this.state.oakFullpath
            );
            ids.forEach((id) => {
                const fileState = this.features.extraFile.getFileState(id);
                if (fileState) {
                    const { state } = fileState;
                    if (['local', 'failed'].includes(state)) {
                        promises.push(
                            (async () => {
                                try {
                                    await this.features.extraFile.upload(
                                        id,
                                        entity
                                    );
                                } catch (err) {
                                    failureIds.push(id);
                                }
                            })()
                        );
                    }
                }
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
            return failureIds;
        },
        async onSubmit(e) {
            const { oakExecutable } = this.state;
            const { beforeCommit, afterCommit, messageProps } = this.props;
            const ids = this.getEfIds();
            if (oakExecutable) {
                if (beforeCommit) {
                    const beforeCommitResult = await beforeCommit();
                    if (beforeCommitResult === false) {
                        return;
                    }
                }
                const id = this.getId();
                await this.execute(undefined, messageProps);
                const failureIds = await this.upload(ids);
                if (failureIds && failureIds.length > 0) {
                    this.setState({
                        failureIds,
                        currentId: id,
                    });
                    return;
                }
                this.setState({
                    failureIds: undefined,
                    currentId: undefined,
                });
                if (afterCommit) {
                    afterCommit(id);
                }
            } else {
                const { failureIds, currentId } = this.state;
                const id2 = currentId;
                assert(failureIds && failureIds.length > 0);
                const failureIds2 = await this.upload(failureIds);
                if (failureIds2 && failureIds2.length > 0) {
                    this.setState({
                        failureIds: failureIds2,
                        currentId: id2,
                    });
                    return;
                }
                this.setState({
                    failureIds: undefined,
                    currentId: undefined,
                });
                if (afterCommit) {
                    afterCommit(id2);
                }
            }
        },
    },
    features: ['extraFile'],
});
