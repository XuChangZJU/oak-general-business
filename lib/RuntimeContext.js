"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
const lodash_1 = require("lodash");
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    token;
    constructor(store, appId) {
        super(store);
        this.applicationId = appId;
    }
    getApplicationId() {
        return this.applicationId;
    }
    setApplicationId(appId) {
        this.applicationId = appId;
    }
    setToken(token) {
        this.token = token;
    }
    async getApplication() {
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
            }, this);
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
            }, this);
            return token;
        }
    }
    getTokenValue() {
        return this.token;
    }
    async toString() {
        const data = {
            applicationId: this.applicationId,
        };
        if (this.token) {
            (0, lodash_1.assign)(data, {
                token: this.token,
            });
        }
        const scene = this.getScene();
        if (scene) {
            (0, lodash_1.assign)(data, {
                scene,
            });
        }
        return JSON.stringify(data);
    }
    static destructString(strCxt) {
        const { applicationId, scene, token, } = JSON.parse(strCxt);
        return {
            applicationId,
            scene,
            token,
        };
    }
}
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
