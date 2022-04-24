"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    token;
    constructor(store, appId, token) {
        super(store);
        this.applicationId = appId;
        this.token = token;
    }
    async getApplication() {
        const { result: [application] } = await this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
            },
            filter: {
                id: this.applicationId,
            }
        }, this);
        return application;
    }
    async getToken() {
        if (this.token) {
            const { result: [token] } = await this.rowStore.select('token', {
                data: {
                    id: 1,
                    userId: 1,
                    playerId: 1,
                },
                filter: {
                    id: this.token,
                    ableState: 'enabled',
                }
            }, this);
            return token;
        }
    }
}
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
