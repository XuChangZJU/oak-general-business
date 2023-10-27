import { EntityDict } from '../../../oak-app-domain';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';

export default OakComponent({
    entity: 'bridge',
    isList: false,
    data: {
        period: 7,
        bridgeId: '',
        options: [] as { id: string; value: string }[],
        searchValue: '',
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        redirectTo: undefined as
            | EntityDict['bridge']['Schema']['redirectTo']
            | undefined,
    },
    lifetimes: {
        ready() { },
    },
    formData: ({ data }) => {
        return {
        };
    },
    methods: {
        setPeriod(period: number) {
            this.setState({
                period,
            });
        },
        setInit() {
            this.setState({
                bridgeId: '',
                searchValue: '',
                period: 7,
            });
        },
        async confirm() {
            const { entityId, entity, redirectTo } =
                this.props;
            const { period } = this.state;

            const time = period * 24 * 60 * 60 * 1000;

            if (!period) {
                this.setMessage({
                    type: 'error',
                    content: '请选择',
                });
                return;
            }
            this.update({
                entityId,
                entity,
                expiresAt: Date.now() + time,
                expired: false,
                redirectTo,
            });
            const id = this.getId();
            this.execute();
            this.setState({
                bridgeId: id,
            });
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        false,
        {
            entity: keyof ED2,
            entityId: string,
            redirectTo: EntityDict['bridge']['Schema']['redirectTo'],
        }
    >
) => React.ReactElement;
