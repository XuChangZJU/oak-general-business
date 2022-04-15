"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheContext = void 0;
const oak_memory_tree_store_1 = require("oak-memory-tree-store");
class CacheContext extends oak_memory_tree_store_1.Context {
    getApplication;
    getToken;
    constructor(store, application, token) {
        super(store);
        this.getApplication = () => application;
        this.getToken = () => token;
    }
    on(event, callback) {
        throw new Error('disallow cross txn events in FrontContext');
    }
}
exports.CacheContext = CacheContext;
;
