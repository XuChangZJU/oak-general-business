import assert from 'assert';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { ButtonProps } from 'antd';
import { ButtonProps as AmButtonProps } from 'antd-mobile';

type AfterCommit = (() => void) | undefined;
type BeforeCommit =
    | (() => boolean | undefined | Promise<boolean | undefined>)
    | undefined;

export default OakComponent({
    formData({ features }) {
        const ids: string[] = this.getEfIds();
        const states = ids.map((id) => features.extraFile.getFileState(id));
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
        afterCommit: undefined as AfterCommit,
        beforeCommit: undefined as BeforeCommit,
        fnSetMp: {
            afterCommit: undefined,
            beforeCommit: undefined,
        } as
            | {
                  afterCommit?: AfterCommit;
                  beforeCommit?: BeforeCommit;
              }
            | undefined, //小程序传递函数 需要以对象形式传入组件
    },
    data: {
        failureIds: undefined as string[] | undefined,
    },
    methods: {
        getEfIds() {
            const entity = this.features.runningTree.getEntity(
                this.state.oakFullpath
            );
            const value = this.features.runningTree.getFreshValue(
                this.state.oakFullpath
            );
            const efIds = [] as string[];

            const getRecursive = (e: string, v: Record<string, any>) => {
                for (const attr in v) {
                    const rel = this.features.cache.judgeRelation(
                        e as keyof EntityDict,
                        attr
                    );
                    if (rel === 2) {
                        assert(typeof v[attr] === 'object');
                        if (attr === 'extraFile') {
                            assert(v[attr].id);
                            efIds.push(v[attr].id);
                        } else {
                            getRecursive(attr, v[attr]);
                        }
                    } else if (typeof rel === 'string') {
                        assert(typeof v[attr] === 'object');
                        if (rel === 'extraFile') {
                            assert(v[attr].id);
                            efIds.push(v[attr].id);
                        } else {
                            getRecursive(rel, v[attr]);
                        }
                    } else if (rel instanceof Array) {
                        assert(v[attr] instanceof Array);
                        const [e2, fk2] = rel;
                        if (e2 === 'extraFile') {
                            efIds.push(
                                ...v[attr].map((ele: { id: string }) => ele.id)
                            );
                        } else {
                            v[attr].forEach((ele: any) =>
                                getRecursive(e2, ele)
                            );
                        }
                    }
                }
            };

            if (value instanceof Array) {
                value.forEach((ele) => getRecursive(entity, ele));
            } else {
                getRecursive(entity, value as any);
            }
            return efIds;
        },
        async upload(ids: string[]) {
            if (ids.length === 0) {
                return;
            }

            const promises: Promise<void>[] = [];
            const failureIds = [] as string[];
            ids.forEach((id) => {
                const fileState = this.features.extraFile.getFileState(id);
                if (fileState) {
                    const { state } = fileState;
                    if (['local', 'failed'].includes(state)) {
                        promises.push(
                            (async () => {
                                try {
                                    await this.features.extraFile.upload(id);
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
        async onSubmit(e: any) {
            const { oakExecutable } = this.state;
            const { beforeCommit, afterCommit, action, fnSetMp } = this.props;
            const ids = this.getEfIds();

            const beforeCommit2 = fnSetMp?.beforeCommit || beforeCommit;
            const afterCommit2 = fnSetMp?.afterCommit || afterCommit;

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
            } else {
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
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            action?: string;
            size?: ButtonProps['size'] | AmButtonProps['size'];
            block?: boolean;
            type?: ButtonProps['type'] | AmButtonProps['type'];
            executeText?: string;
            buttonProps?: ButtonProps & AmButtonProps;
            afterCommit?: AfterCommit;
            beforeCommit?: BeforeCommit;
            fnSetMp?: {
                //小程序传递函数 需要以对象形式传入组件
                afterCommit?: AfterCommit;
                beforeCommit?: BeforeCommit;
            };
        }
    >
) => React.ReactElement;