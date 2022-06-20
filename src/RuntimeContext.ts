
import { SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
import { assign } from 'lodash';


export abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private applicationId: string;
    private getTokenFn: () => Promise<string | undefined>;
    private scene: string;

    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId: string, getToken: () => Promise<string | undefined>, scene: string) {
        super(store);
        this.applicationId = appId;
        this.getTokenFn = getToken;
        this.scene = scene;
    }

    getApplicationId() {
        return this.applicationId;
    }

    async getApplication () {
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
    
    async getToken() {
        const tokenValue = await this.getTokenFn();
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

    async getTokenValue() {
        return await this.getTokenFn();
    }

    getScene() {
        return this.scene;
    }

    async toString(): Promise<string> {
        const data = {
            applicationId: this.applicationId,
            scene: this.scene,
        };
        const token = await this.getTokenFn();
        if (token) {
            assign(data, {
                token,
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
            getTokenFn: async () => token,
        };
    }
};