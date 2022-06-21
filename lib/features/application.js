"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
const assert_1 = __importDefault(require("assert"));
const projection = {
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
};
class Application extends oak_frontend_base_1.Feature {
    applicationId;
    application;
    rwLock;
    cache;
    constructor(aspectWrapper, applicationId, cache) {
        super(aspectWrapper);
        this.rwLock = new concurrent_1.RWLock();
        this.applicationId = applicationId;
        this.cache = cache;
    }
    async refresh() {
        this.rwLock.acquire('X');
        const { result } = await this.cache.refresh('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        });
        (0, assert_1.default)(result.length === 1);
        this.application = result[0];
        this.rwLock.release();
    }
    getApplication() {
        this.rwLock.acquire('S');
        const result = this.application;
        this.rwLock.release();
        return result;
    }
    getApplicationId() {
        this.rwLock.acquire('S');
        const result = this.applicationId;
        this.rwLock.release();
        return result;
    }
}
exports.Application = Application;
