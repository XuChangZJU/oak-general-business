
import { SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
import { assign } from 'lodash';


export abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private applicationId?: string;
    private token?: string;

    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId?: string) {
        super(store);
        this.applicationId = appId;
    }

    getApplicationId() {
        return this.applicationId;
    }

    setApplicationId(appId: string) {
        this.applicationId = appId;
    }

    setToken(token?: string) {
        this.token = token;
    }

    async getApplication () {
        if (this.applicationId) {
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
                    }
                },
                filter: {
                    id: this.applicationId,
                }
            }, this) as SelectionResult<EntityDict['application']['Schema'], {
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
            
            return application;
        }
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
            applicationId: this.applicationId,
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

    protected static destructString(strCxt: string) {
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