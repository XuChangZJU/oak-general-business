"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeContext = void 0;
const UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
class RuntimeContext extends UniversalContext_1.UniversalContext {
    applicationId;
    constructor(store, appId) {
        super(store);
        this.applicationId = appId;
    }
    getApplication() {
        return this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
            },
            filter: {
                id: this.applicationId,
            }
        }, this);
    }
    getToken() {
    }
}
exports.RuntimeContext = RuntimeContext;
;
