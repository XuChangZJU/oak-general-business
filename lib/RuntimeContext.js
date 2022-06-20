"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
const lodash_1 = require("lodash");
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    getTokenFn;
    scene;
    constructor(store, appId, getToken, scene) {
        super(store);
        this.applicationId = appId;
        this.getTokenFn = getToken;
        this.scene = scene;
    }
    getApplicationId() {
        return this.applicationId;
    }
    async getApplication() {
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
        }, this);
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
            }, this);
            return token;
        }
    }
    async getTokenValue() {
        return await this.getTokenFn();
    }
    getScene() {
        return this.scene;
    }
    async toString() {
        const data = {
            applicationId: this.applicationId,
            scene: this.scene,
        };
        const token = await this.getTokenFn();
        if (token) {
            (0, lodash_1.assign)(data, {
                token,
            });
        }
        return JSON.stringify(data);
    }
}
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
