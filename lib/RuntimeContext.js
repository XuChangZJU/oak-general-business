"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
const lodash_1 = require("lodash");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
const assert_1 = __importDefault(require("assert"));
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    application;
    token;
    rwLockApplication;
    constructor(store, applicationId) {
        super(store);
        this.rwLockApplication = new concurrent_1.RWLock();
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
    setToken(token) {
        this.token = token;
    }
    async getApplication() {
        let result;
        await this.rwLockApplication.acquire('X');
        if (this.application) {
            result = this.application;
        }
        else if (this.applicationId) {
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
                    id: this.applicationId,
                },
            }, this);
            result = application;
            this.application = application;
        }
        this.rwLockApplication.release();
        return result;
    }
    setApplication(app) {
        (0, assert_1.default)(!this.application);
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
