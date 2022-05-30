"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfig = exports.ROOT_USER_ID = exports.ROOT_ROLE_ID = void 0;
exports.ROOT_ROLE_ID = 'oak-root-role';
exports.ROOT_USER_ID = 'oak-root-user';
exports.DefaultConfig = {
    userEntityGrant: {
        lifetimeLength: 3600 * 1000,
    },
};
