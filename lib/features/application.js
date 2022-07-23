"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Feature_1 = require("oak-frontend-base/lib/types/Feature");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
const assert_1 = require("oak-domain/lib/utils/assert");
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
class Application extends Feature_1.Feature {
    applicationId;
    application;
    rwLock;
    cache;
    storage;
    constructor(aspectWrapper, type, cache, storage, callback) {
        super(aspectWrapper);
        this.rwLock = new concurrent_1.RWLock();
        this.cache = cache;
        this.storage = storage;
        const applicationId = storage.load('application:applicationId');
        this.rwLock.acquire('X');
        if (applicationId) {
            this.applicationId = applicationId;
            this.getApplicationFromCache(callback);
        }
        else {
            this.refresh(type, callback);
        }
        this.rwLock.release();
    }
    async getApplicationFromCache(callback) {
        const { result } = await this.cache.refresh('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        });
        (0, assert_1.assert)(result.length === 1);
        this.application = result[0];
        callback(this.application);
    }
    async refresh(type, callback) {
        const { result: applicationId } = await this.getAspectWrapper().exec('getApplication', {
            type,
        });
        this.applicationId = applicationId;
        this.storage.save('application:applicationId', applicationId);
        this.getApplicationFromCache(callback);
    }
    async getApplication() {
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
