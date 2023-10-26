import assert from 'assert';
export default OakComponent({
    formData({ features }) {
        const ids = this.getEfIds();
        const states = ids.map((id) => features.extraFile2.getFileState(id));
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
        afterCommit: () => { },
        beforeCommit: (() => true),
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
                            efIds.push(...(v[attr].map((ele) => ele.id)));
                        }
                        else {
                            v[attr].forEach((ele) => getRecursive(e2, ele));
                        }
                    }
                }
            };
            if (value instanceof Array) {
                value.forEach(ele => getRecursive(entity, ele));
            }
            getRecursive(entity, value);
            return efIds;
        },
        async upload() {
            const ids = this.getEfIds();
            if (ids.length === 0) {
                return;
            }
            const promises = [];
            ids.forEach((id) => {
                const fileState = this.features.extraFile2.getFileState(id);
                if (fileState) {
                    const { state } = fileState;
                    if (['local', 'failed'].includes(state)) {
                        promises.push(this.features.extraFile2.upload(id));
                    }
                }
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        },
        async onSubmit() {
            const { oakExecutable } = this.state;
            const { beforeCommit, afterCommit, action } = this.props;
            if (oakExecutable) {
                if (beforeCommit) {
                    const beforeCommitResult = await beforeCommit();
                    if (beforeCommitResult === false) {
                        return;
                    }
                }
                await this.execute(action || undefined);
                await this.upload();
                if (afterCommit) {
                    afterCommit();
                }
            }
            else {
                await this.upload();
                if (afterCommit) {
                    afterCommit();
                }
            }
        },
    },
    features: ['extraFile2'],
});
