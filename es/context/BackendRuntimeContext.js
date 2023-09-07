import { assert } from 'oak-domain/lib/utils/assert';
import { OakTokenExpiredException, OakUserDisabledException, } from '../types/Exception';
import { OakUnloggedInException, } from 'oak-domain/lib/types/Exception';
import { ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
import { AsyncContext } from 'oak-domain/lib/store/AsyncRowStore';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { applicationProjection } from '../types/projection';
import { getMpUnlimitWxaCode } from '../aspects/wechatQrCode';
/**
 * general数据结构要求的后台上下文
 */
export class BackendRuntimeContext extends AsyncContext {
    application;
    token;
    amIRoot;
    amIReallyRoot;
    rootMode;
    temporaryUserId;
    tokenException;
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
                player: {
                    id: 1,
                    isRoot: 1,
                },
            },
            filter: {
                id: tokenValue,
            },
        }, {
            dontCollect: true,
            blockTrigger: true,
        });
        if (result.length === 0) {
            console.log(`构建BackendRuntimeContext对应tokenValue「${tokenValue}找不到相关的user`);
            // throw new OakTokenExpiredException();
            this.tokenException = new OakTokenExpiredException();
            return;
        }
        const token = result[0];
        if (token.ableState === 'disabled') {
            console.log(`构建BackendRuntimeContext对应tokenValue「${tokenValue}已经被disable`);
            this.tokenException = new OakTokenExpiredException();
            return;
        }
        const { user, player } = token;
        this.amIRoot = user?.isRoot;
        this.amIReallyRoot = player?.isRoot;
        this.token = token;
    }
    async setApplication(appId) {
        const result = await this.select('application', {
            data: applicationProjection,
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
        if (data) {
            await this.begin();
            const closeRootMode = this.openRootMode();
            try {
                const { a: appId, t: tokenValue } = data;
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
                closeRootMode();
                await this.commit();
            }
            catch (err) {
                closeRootMode();
                await this.rollback();
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
        if (this.tokenException) {
            throw this.tokenException;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new OakUnloggedInException();
        }
        return this.token?.id;
    }
    getToken(allowUnloggedIn) {
        if (this.tokenException) {
            throw this.tokenException;
        }
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
        if (this.rootMode) {
            return ROOT_USER_ID;
        }
        if (this.temporaryUserId) {
            return this.temporaryUserId;
        }
        const token = this.getToken(allowUnloggedIn);
        return token?.userId;
    }
    setTemporaryUserId(userId) {
        this.temporaryUserId = userId;
    }
    toString() {
        if (this.rootMode) {
            return JSON.stringify({ rootMode: true });
        }
        return JSON.stringify({ a: this.application?.id, t: this.token?.id });
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
