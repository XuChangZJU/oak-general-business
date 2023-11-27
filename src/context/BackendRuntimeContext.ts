import { RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import {
    OakTokenExpiredException,
    OakUserDisabledException,
} from '../types/Exception';
import {
    OakException,
    OakUnloggedInException,
} from 'oak-domain/lib/types/Exception';
import { ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { SelectOpResult } from 'oak-domain/lib/types';
import { applicationProjection } from '../types/Projection';
import { getMpUnlimitWxaCode } from '../aspects/wechatQrCode';
import { BackendRuntimeContext as BRC } from 'oak-frontend-base';
import { AsyncRowStore } from 'oak-domain/lib/store/AsyncRowStore';
import { IncomingHttpHeaders } from 'http';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
/**
 * general数据结构要求的后台上下文
 */
export abstract class BackendRuntimeContext<ED extends EntityDict & BaseEntityDict>
    extends BRC<ED>
    implements RuntimeContext
{
    protected application?: Partial<ED['application']['Schema']>;
    protected token?: Partial<ED['token']['Schema']>;
    protected amIRoot?: boolean;
    protected amIReallyRoot?: boolean;
    protected rootMode?: boolean;

    async refineOpRecords(): Promise<void> {
        for (const opRecord of this.opRecords) {
            if (opRecord.a === 's') {
                const { d } = opRecord as SelectOpResult<ED>;
                for (const entity in d) {
                    if (entity === 'wechatQrCode') {
                        // todo 小程序码此时去微信服务器获得码数据
                        const wechatQrCodeListObj = d[entity];
                        for (const id in wechatQrCodeListObj) {
                            const wechatQrCodeData = wechatQrCodeListObj[
                                id
                            ] as Partial<
                                EntityDict['wechatQrCode']['OpSchema']
                            >;
                            if (
                                wechatQrCodeData.hasOwnProperty('buffer') &&
                                wechatQrCodeData.type === 'wechatMpWxaCode'
                            ) {
                                const buffer = await getMpUnlimitWxaCode<
                                    ED,
                                    keyof ED,
                                    BackendRuntimeContext<ED>
                                >(id, this);
                                Object.assign(wechatQrCodeData, {
                                    buffer,
                                });
                            }
                        }
                    } else if (
                        ['application', 'system', 'platform'].includes(entity)
                    ) {
                        // todo 删除掉config中的敏感返回信息
                    }
                }
            }
        }
    }

    async setTokenValue(tokenValue: string) {
        const result = await this.select(
            'token',
            {
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
            },
            {
                dontCollect: true,
                blockTrigger: true,
            }
        );
        if (result.length === 0) {
            console.log(
                `构建BackendRuntimeContext对应tokenValue「${tokenValue}找不到相关的user`
            );
            throw new OakTokenExpiredException();
            // this.tokenException = new OakTokenExpiredException();
            return;
        }
        const token = result[0];
        if (token.ableState === 'disabled') {
            console.log(
                `构建BackendRuntimeContext对应tokenValue「${tokenValue}已经被disable`
            );
            throw new OakTokenExpiredException();
            // this.tokenException = new OakTokenExpiredException();
            return;
        }
        const { user, player } = token;
        this.amIRoot = user?.isRoot!;
        this.amIReallyRoot = player?.isRoot!;
        this.token = token;
    }

    async setApplication(appId: string) {
        const result = await this.select(
            'application',
            {
                data: cloneDeep(applicationProjection),
                filter: {
                    id: appId,
                },
            },
            {
                dontCollect: true,
                blockTrigger: true,
            }
        );
        assert(
            result.length > 0,
            `构建BackendRuntimeContext对应appId「${appId}」找不到application`
        );
        this.application = result[0];
    }

    async initialize(data?: SerializedData) {
        await super.initialize(data);
        if (data) {
            const closeRootMode = this.openRootMode();
            try {
                const { a: appId, t: tokenValue, rm } = data;
                const promises: Promise<void>[] = [];
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
            } catch (err) {
                closeRootMode();
                throw err;
            }
        } else {
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

    openRootMode(): () => void {
        if (this.rootMode) {
            return () => undefined;
        }
        this.rootMode = true;
        return () => (this.rootMode = false);
    }

    getTokenValue(allowUnloggedIn?: boolean) {
        if (this.rootMode) {
            return ROOT_TOKEN_ID;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new OakUnloggedInException();
        }
        return this.token?.id;
    }

    getToken(allowUnloggedIn?: boolean) {
        if (!this.token && !allowUnloggedIn) {
            throw new OakUnloggedInException();
        }
        if (this.token) {
            const { userState } = this.token.user!;
            if (
                ['disabled', 'merged'].includes(userState as string) &&
                !this.isReallyRoot()
            ) {
                throw new OakUserDisabledException();
            }
        }
        return this.token;
    }

    getCurrentUserId(allowUnloggedIn?: boolean) {
        const token = this.getToken(allowUnloggedIn);
        return token?.userId as string;
    }

    protected getSerializedData(): SerializedData {
        const data = super.getSerializedData();
        return {
            ...data,
            a: this.application?.id,
            t: this.token?.id,
            rm: this.rootMode,
        };
    }

    isRoot() {
        if (this.rootMode) {
            return true;
        }
        return !!this.amIRoot;
    }

    isReallyRoot(): boolean {
        return !!this.amIReallyRoot;
    }

    async sendMessage(data: ED['message']['CreateSingle']['data']) {
        return this.operate(
            'message',
            {
                id: await generateNewIdAsync(),
                action: 'create',
                data,
            },
            {
                dontCollect: true,
            }
        );
    }

    allowUserUpdate(): boolean {
        if (this.isReallyRoot()) {
            return true;
        }
        const userInfo = this.token?.user;
        if (userInfo) {
            const { userState } = userInfo!;
            if (userState === 'disabled') {
                throw new OakUserDisabledException(
                    '您的帐号已经被禁用，请联系客服'
                );
            } else if (['merged'].includes(userState!)) {
                throw new OakTokenExpiredException(
                    '您的登录状态有异常，请重新登录 '
                );
            } else {
                assert(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new OakUnloggedInException('您尚未登录');
    }
}
