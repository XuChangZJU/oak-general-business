import { EntityDict } from '../../../../oak-app-domain';
import { ReactComponentProps } from 'oak-frontend-base';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';

export default OakComponent({
    isList: false,
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        allowUpdateName: false,
        allowUpdateNickname: false,
    },
    data: {
        relations: [] as EntityDict['relation']['OpSchema'][],
    },
    lifetimes: {
        async ready() {
            const { entity, entityId } = this.props;
            const isRoot = this.features.token.isRoot();
            const filter: EntityDict['relation']['Selection']['filter'] = {
                entity: entity as string,
                $or: [
                    {
                        entityId,
                    },
                    {
                        entityId: {
                            $exists: false,
                        },
                    },
                ],
            };
            if (!isRoot) {
                const userId = this.features.token.getUserId();
                filter.relationAuth$destRelation = {
                    sourceRelation: {
                        userRelation$relation: {
                            userId,
                        },
                    },
                };
            }
            const { data: relations } = await this.features.cache.refresh(
                'relation',
                {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        name: 1,
                        display: 1,
                    },
                    filter,
                }
            );
            this.setState({
                relations: relations as EntityDict['relation']['OpSchema'][],
            });
        },
    },
    methods: {
        onConfirm() {
            this.execute();
        },
        onReset() {
            this.clean();
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            entity: keyof ED2;
            entityId: string;
            allowUpdateName?: boolean;
            allowUpdateNickname?: boolean;
        }
    >
) => React.ReactElement;

