
import { SelectRowShape, SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
import { assign } from 'lodash';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import assert from 'assert';

type AppType = SelectRowShape<EntityDict['application']['Schema'], {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
    },
}>;

export abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private application?: AppType;
    private token?: string;
    private rwLockApplication: RWLock;

    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, applicationId?: string) {
        super(store);
        this.rwLockApplication = new RWLock();
        this.rwLockApplication.acquire('X');
        if (applicationId) {
            this.loadApplication(applicationId);
        }
    }

    private async loadApplication(id: string) {
        const { result: [application] } = await this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
                system: {
                    id: 1,
                    name: 1,
                    config: 1,
                },
            },
            filter: {
                id,
            },
        }, this);
        this.application = application as AppType;
        this.rwLockApplication.release();
    }

    getApplicationId() {
        const result = this.application?.id;
        return result!;
    }

    getSystemId() {
        return this.application!.systemId;
    }

    setToken(token?: string) {
        this.token = token;
    }

    async getApplication () {
        await this.rwLockApplication.acquire('S');
        const result =  this.application!;
        this.rwLockApplication.release();
        return result;
    }

    setApplication(app: AppType) {
        assert(!this.application);
        this.application = app;
        this.rwLockApplication.release();
    }
    
    async getToken() {
        const tokenValue = this.token;
        if (tokenValue) {
            const { result: [token] } = await this.rowStore.select('token', {
                data: {
                    id: 1,
                    userId: 1,
                    playerId: 1,
                },
                filter: {
                    id: tokenValue,
                    ableState: 'enabled',
                }
            }, this) as SelectionResult<ED['token']['Schema'], {id: 1, userId: 1, playerId: 1}>;

            return token;
        }
    }

    getTokenValue() {
        return this.token;
    }

    async toString(): Promise<string> {
        const data = {
            applicationId: this.getApplicationId(),
        };
        if (this.token) {
            assign(data, {
                token: this.token,
            });
        }
        const scene = this.getScene();
        if (scene) {
            assign(data, {
                scene,
            });
        }
        return JSON.stringify(data);
    }

    protected static fromString(strCxt: string) {
        const {
            applicationId,
            scene,
            token,
        } = JSON.parse(strCxt);

        return {
            applicationId,
            scene,
            token,
        };
    }
};