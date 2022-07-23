
import { SelectRowShape, SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';

import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { assert } from 'oak-domain/lib/utils/assert';

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
    private applicationId?: string;
    private application?: AppType;
    private token?: string;
    private rwLockApplication: RWLock;

    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, applicationId?: string) {
        super(store);
        this.rwLockApplication = new RWLock();
        this.applicationId = applicationId;
        if (!applicationId) {
            this.rwLockApplication.acquire('X');
        }
    }

    getApplicationId() {
        return this.applicationId;
    }

    async getSystemId() {
        const app = await this.getApplication();
        return app?.systemId;
    }

    setToken(token?: string) {
        this.token = token;
    }

    async getApplication() {
        let result;
        await this.rwLockApplication.acquire('X');
        if (this.application) {
            result = this.application;
        }
        else if (this.applicationId) {
            const { result: [application]} = await this.rowStore.select('application', {
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
                    id: this.applicationId,
                },
            }, this);
            result = application as AppType;
            this.application = application as AppType;
        }
        this.rwLockApplication.release();
        return result;
    }

    setApplication(app: AppType) {
        assert(!this.application);
        this.application = app;
        this.applicationId = app.id;
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
            }, this) as SelectionResult<ED['token']['Schema'], { id: 1, userId: 1, playerId: 1 }>;

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
            Object.assign(data, {
                token: this.token,
            });
        }
        const scene = this.getScene();
        if (scene) {
            Object.assign(data, {
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