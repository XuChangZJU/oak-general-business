"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        super();
        this.rwLock = new concurrent_1.RWLock();
    }
    async setApplicationId(id) {
        this.rwLock.acquire('X');
        this.applicationId = id;
        const { result } = await this.cache.refresh('application', {
            data: projection,
            filter: {
                id,
            }
        }, 'Application:setApplicationId');
        (0, assert_1.default)(result.length === 1);
        this.application = result[0];
        this.rwLock.release();
    }
    setCache(cache) {
        this.cache = cache;
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
__decorate([
    oak_frontend_base_1.Action
], Application.prototype, "setApplicationId", null);
exports.Application = Application;
