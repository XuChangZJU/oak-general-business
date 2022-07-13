"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
const lodash_1 = require("lodash");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    application;
    token;
    rwLockApplication;
    constructor(store, application) {
        super(store);
        this.rwLockApplication = new concurrent_1.RWLock();
        this.application = application;
        if (!application) {
            this.rwLockApplication.acquire('X');
        }
    }
    getApplicationId() {
        const result = this.application?.id;
        return result;
    }
    getSystemId() {
        return this.application.systemId;
    }
    setToken(token) {
        this.token = token;
    }
    async getApplication() {
        await this.rwLockApplication.acquire('S');
        const result = this.application;
        this.rwLockApplication.release();
        return result;
    }
    setApplication(app) {
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
            }, this);
            return token;
        }
    }
    getTokenValue() {
        return this.token;
    }
    async toString() {
        const data = {
            applicationId: this.getApplicationId(),
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
    static fromString(strCxt) {
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
