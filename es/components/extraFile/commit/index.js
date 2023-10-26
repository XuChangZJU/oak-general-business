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
        action: '',
        efPaths: [],
        size: 'middle',
        block: false,
        type: 'primary',
        executeText: '',
        buttonProps: {},
        afterCommit: () => { },
        beforeCommit: (() => true),
    },
    methods: {
        getEfIds(strict) {
            const { efPaths } = this.props;
            const { oakFullpath } = this.state;
            assert(efPaths && efPaths.length > 0);
            if (oakFullpath) {
                const ids = efPaths
                    .map((path) => {
                    const path2 = path
                        ? `${oakFullpath}.${path}`
                        : oakFullpath;
                    const data = this.features.runningTree.getFreshValue(path2);
                    if (strict) {
                        assert(data, `efPath为${path}的路径上取不到extraFile数据，请设置正确的相对路径`);
                    }
                    return data?.map((ele) => ele.id);
                })
                    .flat()
                    .filter((ele) => !!ele);
                return ids;
            }
            return [];
        },
        async upload() {
            const ids = this.getEfIds(true);
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
            console.log(beforeCommit, afterCommit, action);
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
