"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
class GeneralRuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    constructor(store, appId) {
        super(store);
        this.applicationId = appId;
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
    getToken() {
    }
}
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
