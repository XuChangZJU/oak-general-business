"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const constants_1 = require("../config/constants");
const oak_frontend_base_1 = require("oak-frontend-base");
const assert_1 = require("oak-domain/lib/utils/assert");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const Projection_1 = require("../types/Projection");
const Exception_1 = require("../types/Exception");
class Application extends oak_frontend_base_1.Feature {
    type;
    domain; //域名
    applicationId;
    application;
    cache;
    storage;
    projection;
    token;
    constructor(type, domain, cache, storage, token) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.type = type;
        this.domain = domain;
        this.projection = (0, lodash_1.cloneDeep)(Projection_1.applicationProjection);
        this.token = token;
    }
    async refresh() {
        const { data } = await this.cache.refresh('application', {
            data: this.projection,
            filter: {
                id: this.applicationId,
            },
        });
        (0, assert_1.assert)(data.length === 1, `refresh:applicationId${this.applicationId}没有取到有效数据`);
        this.application = data[0];
        if (this.application.type !== this.type) {
            this.storage.remove(constants_1.LOCAL_STORAGE_KEYS.appId);
        }
    }
    getApplicationFromCache() {
        const data = this.cache.get('application', {
            data: this.projection,
            filter: {
                id: this.applicationId,
            },
        });
        (0, assert_1.assert)(data.length === 1, `cache:applicationId${this.applicationId}没有取到有效数据`);
        this.application = data[0];
    }
    async loadApplicationInfo(type, domain) {
        let applicationId;
        try {
            const { result } = await this.cache.exec('getApplication', {
                type,
                domain,
            });
            applicationId = result;
        }
        catch (err) {
            if (err instanceof Exception_1.OakTokenExpiredException ||
                err instanceof Exception_1.OakUserDisabledException) {
                // 出现上面的异常，先清除本地token, 重新发起一次请求
                this.token.removeToken(true);
                const { result } = await this.cache.exec('getApplication', {
                    type,
                    domain,
                });
                applicationId = result;
            }
            throw err;
        }
        this.applicationId = applicationId;
        this.getApplicationFromCache();
        // 如果取得的type和当前环境不同，则不缓存id(未来可能有type相同的application上线)
        // if (this.application?.type === type) {
        //     this.storage.save(LOCAL_STORAGE_KEYS.appId, applicationId);
        // }
        this.publish();
    }
    async initialize(appId, projection) {
        // const applicationId = await this.storage.load(LOCAL_STORAGE_KEYS.appId);
        // this.applicationId = applicationId;
        //接收外层注入的projection
        this.projection = (0, lodash_1.merge)(this.projection, projection);
        if (process.env.NODE_ENV === 'development' && appId) {
            // development环境下允许注入一个线上的appId
            this.applicationId = appId;
            if (this.applicationId) {
                return await this.refresh();
            }
        }
        // if (this.applicationId) {
        //     await this.refresh();
        // } else {
        //     await this.loadApplicationInfo(this.type, this.domain);
        // }
        return await this.loadApplicationInfo(this.type, this.domain);
    }
    getApplication() {
        return this.application;
    }
    getApplicationId() {
        return this.applicationId;
    }
    async uploadWechatMedia(params) {
        const { applicationId, type, file, description, isPermanent = false, } = params;
        const formData = new FormData();
        formData.append('applicationId', applicationId);
        formData.append('type', type);
        formData.append('file', file);
        if (description) {
            formData.append('description', JSON.stringify(description));
        }
        if (isPermanent) {
            formData.append('isPermanent', `${isPermanent}`);
        }
        const callBack = await this.cache.exec('uploadWechatMedia', formData);
        return callBack.result;
    }
}
exports.Application = Application;
