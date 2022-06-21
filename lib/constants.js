"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfig = exports.ROOT_TOKEN_ID = exports.ROOT_MOBILE_ID = exports.ROOT_USER_ID = exports.ROOT_ROLE_ID = void 0;
exports.ROOT_ROLE_ID = 'oak-root-role';
exports.ROOT_USER_ID = 'oak-root-user';
exports.ROOT_MOBILE_ID = 'oak-root-mobile';
exports.ROOT_TOKEN_ID = 'oak-root-token';
exports.DefaultConfig = {
    userEntityGrant: {
        lifetimeLength: 3600 * 1000,
    },
};
