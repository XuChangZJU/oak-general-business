import assert from 'assert';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { ButtonProps } from 'antd';
import { ButtonProps as AmButtonProps } from 'antd-mobile';

export default OakComponent({
    formData({ features }) {
        const ids: string[] = this.getEfIds();
        const states = ids.map((id) => features.extraFile2.getFileState(id));
        let state: FileState = 'uploaded';
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
        action: undefined as string | undefined,
        size: 'middle',
        block: false,
        type: 'primary',
        executeText: '',
        buttonProps: {},
        afterCommit: () => { },
        beforeCommit: (() => true) as () => boolean | undefined | Promise<boolean | undefined>,
    },
    methods: {
        getEfIds() {
            const entity = this.features.runningTree.getEntity(this.state.oakFullpath);
            const value = this.features.runningTree.getFreshValue(this.state.oakFullpath);
            const efIds = [] as string[];

            const getRecursive = (e: string, v: Record<string, any>) => {
                for (const attr in v) {
                    const rel = this.features.cache.judgeRelation(e as keyof EntityDict, attr);
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
                            efIds.push(...(v[attr].map((ele: { id: string }) => ele.id)));
                        }
                        else {
                            v[attr].forEach(
                                (ele: any) => getRecursive(e2, ele)
                            );
                        }
                    }
                }
            };

            if (value instanceof Array) {
                value.forEach(
                    ele => getRecursive(entity, ele)
                );
            }
            getRecursive(entity, value as any);
            return efIds;
        },
        async upload() {
            const ids = this.getEfIds();
            if (ids.length === 0) {
                return;
            }

            const promises: Promise<void>[] = [];
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
            } else {
                await this.upload();
                if (afterCommit) {
                    afterCommit();
                }
            }
        },
    },
    features: ['extraFile2'],
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
        props: ReactComponentProps<
            ED2,
            T2,
            true,
            {
                action?: string;
                size?: ButtonProps['size'] | AmButtonProps['size'],
                block?: boolean,
                type?: ButtonProps['type'] | AmButtonProps['type'],
                executeText?: string,
                buttonProps?: ButtonProps & AmButtonProps,
                afterCommit?: () => any,
                beforeCommit?: () => boolean | undefined | Promise<boolean | undefined>,
            }
        >
    ) => React.ReactElement;