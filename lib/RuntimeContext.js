"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
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
    async getApplication() {
        const { result: [application] } = await this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
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
}
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
