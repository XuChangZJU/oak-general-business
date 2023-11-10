import assert from 'assert';
export default OakComponent({
    formData({ features }) {
        const ids = this.getEfIds();
        const states = ids.map((id) => features.extraFile.getFileState(id));
        let state = 'uploaded';
        states.forEach((ele) => {
            if (ele) {
                if (['failed', 'local'].includes(ele.state)) {
                    state = ele.state;
                }
                else if (ele.state === 'uploading' && state === 'uploaded') {
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
        fnSet: {
            afterCommit: undefined,
            beforeCommit: undefined,
        }, //小程序传递函数 需要以对象形式传入组件
    },
    data: {
        failureIds: undefined,
    },
    methods: {
        getEfIds() {
            const entity = this.features.runningTree.getEntity(this.state.oakFullpath);
            const value = this.features.runningTree.getFreshValue(this.state.oakFullpath);
            const efIds = [];
            const getRecursive = (e, v) => {
                for (const attr in v) {
                    const rel = this.features.cache.judgeRelation(e, attr);
                    if (rel === 2) {
                        assert(typeof v[attr] === 'object');
                        if (attr === 'extraFile') {
                            assert(v[attr].id);
                            efIds.push(v[attr].id);
                        }
                        else {
                            getRecursive(attr, v[attr]);
                        }
                    }
                    else if (typeof rel === 'string') {
                        assert(typeof v[attr] === 'object');
                        if (rel === 'extraFile') {
                            assert(v[attr].id);
                            efIds.push(v[attr].id);
                        }
                        else {
                            getRecursive(rel, v[attr]);
                        }
                    }
                    else if (rel instanceof Array) {
                        assert(v[attr] instanceof Array);
                        const [e2, fk2] = rel;
                        if (e2 === 'extraFile') {
                            efIds.push(...v[attr].map((ele) => ele.id));
                        }
                        else {
                            v[attr].forEach((ele) => getRecursive(e2, ele));
                        }
                    }
                }
            };
            if (value instanceof Array) {
                value.forEach((ele) => getRecursive(entity, ele));
            }
            else {
                getRecursive(entity, value);
            }
            return efIds;
        },
        async upload(ids) {
            if (ids.length === 0) {
                return;
            }
            const promises = [];
            const failureIds = [];
            ids.forEach((id) => {
                const fileState = this.features.extraFile.getFileState(id);
                if (fileState) {
                    const { state } = fileState;
                    if (['local', 'failed'].includes(state)) {
                        promises.push((async () => {
                            try {
                                await this.features.extraFile.upload(id);
                            }
                            catch (err) {
                                failureIds.push(id);
                            }
                        })());
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
            const { beforeCommit, afterCommit, action, fnSet } = this.props;
            const ids = this.getEfIds();
            const beforeCommit2 = fnSet?.beforeCommit || beforeCommit;
            const afterCommit2 = fnSet?.afterCommit || afterCommit;
            if (oakExecutable) {
                if (typeof beforeCommit2 === 'function') {
                    const beforeCommitResult = await beforeCommit2();
                    if (beforeCommitResult === false) {
                        return;
                    }
                }
                await this.execute(action || undefined);
                const failureIds = await this.upload(ids);
                if (failureIds && failureIds.length > 0) {
                    this.setState({
                        failureIds,
                    });
                    return;
                }
                this.setState({
                    failureIds: undefined,
                });
                if (typeof afterCommit2 === 'function') {
                    afterCommit2();
                }
            }
            else {
                const { failureIds } = this.state;
                assert(failureIds && failureIds.length > 0);
                const failureIds2 = await this.upload(failureIds);
                if (failureIds2 && failureIds2.length > 0) {
                    this.setState({
                        failureIds: failureIds2,
                    });
                    return;
                }
                this.setState({
                    failureIds: undefined,
                });
                if (typeof afterCommit2 === 'function') {
                    afterCommit2();
                }
            }
        },
    },
    features: ['extraFile'],
});
