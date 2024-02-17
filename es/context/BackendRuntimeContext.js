import { assert } from 'oak-domain/lib/utils/assert';
import { OakTokenExpiredException, OakUserDisabledException, } from '../types/Exception';
import { OakUnloggedInException, } from 'oak-domain/lib/types/Exception';
import { ROOT_TOKEN_ID } from '../constants';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { applicationProjection } from '../types/Projection';
import { getMpUnlimitWxaCode } from '../aspects/wechatQrCode';
import { BackendRuntimeContext as BRC } from 'oak-frontend-base/lib/context/BackendRuntimeContext';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
/**
 * general数据结构要求的后台上下文
 */
export class BackendRuntimeContext extends BRC {
    application;
    token;
    amIRoot;
    amIReallyRoot;
    rootMode;
    userId;
    async refineOpRecords() {
        for (const opRecord of this.opRecords) {
            if (opRecord.a === 's') {
                const { d } = opRecord;
                for (const entity in d) {
                    if (entity === 'wechatQrCode') {
                        // todo 小程序码此时去微信服务器获得码数据
                        const wechatQrCodeListObj = d[entity];
                        for (const id in wechatQrCodeListObj) {
                            const wechatQrCodeData = wechatQrCodeListObj[id];
                            if (wechatQrCodeData.hasOwnProperty('buffer') &&
                                wechatQrCodeData.type === 'wechatMpWxaCode') {
                                const buffer = await getMpUnlimitWxaCode(id, this);
                                Object.assign(wechatQrCodeData, {
                                    buffer,
                                });
                            }
                        }
                    }
                    else if (['application', 'system', 'platform'].includes(entity)) {
                        // todo 删除掉config中的敏感返回信息
                    }
                }
            }
        }
    }
    async setTokenValue(tokenValue) {
        const result = await this.select('token', {
            data: {
                id: 1,
                ableState: 1,
                user: {
                    id: 1,
                    userState: 1,
                    isRoot: 1,
                },
                value: 1,
                player: {
                    id: 1,
                    isRoot: 1,
                },
            },
            filter: {
                value: tokenValue,
            },
        }, {
            dontCollect: true,
            blockTrigger: true,
        });
        if (result.length === 0) {
            console.log(`构建BackendRuntimeContext对应tokenValue「${tokenValue}找不到相关的user`);
            throw new OakTokenExpiredException();
            // this.tokenException = new OakTokenExpiredException();
            return;
        }
        const token = result[0];
        if (token.ableState === 'disabled') {
            console.log(`构建BackendRuntimeContext对应tokenValue「${tokenValue}已经被disable`);
            throw new OakTokenExpiredException();
            // this.tokenException = new OakTokenExpiredException();
            return;
        }
        const { user, player } = token;
        this.amIRoot = user?.isRoot;
        this.amIReallyRoot = player?.isRoot;
        this.token = token;
    }
    async setApplication(appId) {
        const result = await this.select('application', {
            data: cloneDeep(applicationProjection),
            filter: {
                id: appId,
            },
        }, {
            dontCollect: true,
            blockTrigger: true,
        });
        assert(result.length > 0, `构建BackendRuntimeContext对应appId「${appId}」找不到application`);
        this.application = result[0];
    }
    async initialize(data) {
        await super.initialize(data);
        if (data) {
            const closeRootMode = this.openRootMode();
            try {
                const { a: appId, t: tokenValue, rm } = data;
                const promises = [];
                if (appId) {
                    promises.push(this.setApplication(appId));
                }
                if (tokenValue) {
                    promises.push(this.setTokenValue(tokenValue));
                }
                if (promises.length > 0) {
                    await Promise.all(promises);
                }
                if (!rm) {
                    closeRootMode();
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
        }
        else {
            // 否则是后台模式，默认用root
            this.rootMode = true;
        }
    }
    getApplicationId() {
        return this.application?.id;
    }
    getSystemId() {
        return this.application?.systemId;
    }
    getApplication() {
        return this.application;
    }
    openRootMode() {
        if (this.rootMode) {
            return () => undefined;
        }
        this.rootMode = true;
        return () => (this.rootMode = false);
    }
    getTokenValue(allowUnloggedIn) {
        if (this.rootMode) {
            return ROOT_TOKEN_ID;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new OakUnloggedInException();
        }
        return this.token?.value;
    }
    getToken(allowUnloggedIn) {
        if (!this.token && !allowUnloggedIn) {
            throw new OakUnloggedInException();
        }
        if (this.token) {
            const { userState } = this.token.user;
            if (['disabled', 'merged'].includes(userState) &&
                !this.isReallyRoot()) {
                throw new OakUserDisabledException();
            }
        }
        return this.token;
    }
    getCurrentUserId(allowUnloggedIn) {
        if (this.userId) {
            return this.userId;
        }
        const token = this.getToken(allowUnloggedIn);
        return token?.userId;
    }
    setCurrentUserId(userId) {
        assert(this.isReallyRoot);
        this.userId = userId;
    }
    async getSerializedData() {
        const data = await super.getSerializedData();
        return {
            ...data,
            a: this.application?.id,
            t: this.token?.value,
            rm: this.rootMode,
        };
    }
    isRoot() {
        if (this.rootMode) {
            return true;
        }
        return !!this.amIRoot;
    }
    isReallyRoot() {
        return !!this.amIReallyRoot;
    }
    async sendMessage(data) {
        return this.operate('message', {
            id: await generateNewIdAsync(),
            action: 'create',
            data,
        }, {
            dontCollect: true,
        });
    }
    allowUserUpdate() {
        if (this.isReallyRoot()) {
            return true;
        }
        const userInfo = this.token?.user;
        if (userInfo) {
            const { userState } = userInfo;
            if (userState === 'disabled') {
                throw new OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['merged'].includes(userState)) {
                throw new OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                assert(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new OakUnloggedInException('您尚未登录');
    }
}
