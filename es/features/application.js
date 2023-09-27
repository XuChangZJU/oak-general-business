import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { Feature } from 'oak-frontend-base';
import { assert } from 'oak-domain/lib/utils/assert';
import { merge } from 'oak-domain/lib/utils/lodash';
import { applicationProjection } from '../types/Projection';
export class Application extends Feature {
    type;
    domain; //域名
    applicationId;
    application;
    cache;
    storage;
    projection;
    constructor(type, domain, cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
        const applicationId = storage.load(LOCAL_STORAGE_KEYS.appId);
        this.applicationId = applicationId;
        this.type = type;
        this.domain = domain;
        this.projection = applicationProjection;
    }
    async refresh() {
        const { data } = await this.cache.refresh('application', {
            data: this.projection,
            filter: {
                id: this.applicationId,
            },
        });
        assert(data.length === 1, `refresh:applicationId${this.applicationId}没有取到有效数据`);
        this.application = data[0];
        if (this.application.type !== this.type) {
            this.storage.remove(LOCAL_STORAGE_KEYS.appId);
        }
    }
    getApplicationFromCache() {
        const data = this.cache.get('application', {
            data: this.projection,
            filter: {
                id: this.applicationId,
            },
        });
        assert(data.length === 1, `cache:applicationId${this.applicationId}没有取到有效数据`);
        this.application = data[0];
    }
    async loadApplicationInfo(type, domain) {
        const { result: applicationId } = await this.cache.exec('getApplication', {
            type,
            domain,
        });
        this.applicationId = applicationId;
        this.getApplicationFromCache();
        // 如果取得的type和当前环境不同，则不缓存id(未来可能有type相同的appliction上线)
        if (this.application?.type === type) {
            this.storage.save(LOCAL_STORAGE_KEYS.appId, applicationId);
        }
        this.publish();
    }
    async initialize(appId, projection) {
        //接收外层注入的projection
        this.projection = merge(this.projection, projection);
        if (process.env.NODE_ENV === 'development' && appId) {
            // development环境下允许注入一个线上的appId
            this.applicationId = appId;
        }
        if (this.applicationId) {
            await this.refresh();
        }
        else {
            await this.loadApplicationInfo(this.type, this.domain);
        }
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
