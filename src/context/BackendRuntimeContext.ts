import { RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import assert from 'assert';
import { OakTokenExpiredException, OakUserDisabledException } from '../types/Exception';
import { OakUnloggedInException } from 'oak-domain/lib/types/Exception';
import { ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
import { AsyncContext } from 'oak-domain/lib/store/AsyncRowStore';

/**
 * general数据结构要求的后台上下文
 */
export class BackendRuntimeContext<ED extends EntityDict> extends AsyncContext<ED> implements RuntimeContext {
    protected application?: Partial<ED['application']['Schema']>;
    protected token?: Partial<ED['token']['Schema']>;
    protected amIRoot?: boolean;
    protected amIReallyRoot?: boolean;
    protected rootMode?: boolean;

    protected async initialize(data?: SerializedData) {
        if (data) {
            await this.begin();
            try {
                const { a: appId, t: tokenValue } = data;
                if (appId) {
                    const result = await this.select(
                        'application',
                        {
                            data: {
                                id: 1,
                                name: 1,
                                config: 1,
                                type: 1,
                                systemId: 1,
                                style: 1,
                                system: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    platformId: 1,
                                    style: 1,
                                    folder: 1,
                                    super: 1,
                                    platform: {
                                        id: 1,
                                        config: 1,
                                        style: 1,
                                    },
                                },
                            },
                            filter: {
                                id: appId,
                            },
                        },
                        {
                            dontCollect: true,
                            blockTrigger: true,
                        }
                    );
                    assert(result.length > 0, `构建BackendRuntimeContext对应appId「${appId}」找不到application`);
                    this.application = result[0];
                }
                if (tokenValue) {
                    const result = await this.select('token', {
                        data: {
                            id: 1,
                            userId: 1,
                            playerId: 1,
                            player: {
                                id: 1,
                                userState: 1,
                                userRole$user: {
                                    $entity: 'userRole',
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        roleId: 1,
                                        role: {
                                            id: 1,
                                            name: 1,
                                        }
                                    },
                                },
                            },
                            ableState: 1,
                            user: {
                                id: 1,
                                userState: 1,
                                userRole$user: {
                                    $entity: 'userRole',
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        roleId: 1,
                                        role: {
                                            id: 1,
                                            name: 1,
                                        }
                                    },
                                },
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
                        throw new OakTokenExpiredException();
                    }
                    const token = result[0];
                    if (token.ableState === 'disabled') {
                        throw new OakTokenExpiredException();
                    }
                    const { user, player } = token;
                    const { userRole$user } = user!;
                    this.amIRoot = (userRole$user as any).length > 0 && (userRole$user as any).find(
                        (ele: any) => ele.role.name === 'root'
                    );
                    const { userRole$user: userRole$player} = player!;
                    this.amIReallyRoot = (userRole$player as any).length > 0 && (userRole$player as any).find(
                        (ele: any) => ele.role.name === 'root'
                    );
                    this.token = token;
                }
                await this.commit();
            }
            catch(err) {
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
            if (['disabled', 'merged'].includes(userState as string)) {
                throw new OakUserDisabledException();
            }
        }
        return this.token;
    }

    getCurrentUserId(allowUnloggedIn?: boolean) {
        if (this.rootMode) {
            return ROOT_USER_ID as string;
        }
        const token = this.getToken(allowUnloggedIn);
        return token?.userId as string;
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

    isReallyRoot(): boolean {
        return !!this.amIReallyRoot;
    }

    sendMessage(data: ED['message']['CreateSingle']['data']) {
        return this.operate('message', {
            action: 'create',
            data,
        }, {
            dontCollect: true,
        });
    }
    
    allowUserUpdate(): boolean {
        if (this.isReallyRoot()) {
            return true;
        }
        const userInfo = this.token?.user;
        if (userInfo) {
            const { userState } = userInfo;
            if (userState === 'disabled') {
                throw new OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['shadow', 'merged'].includes(userState!)) {
                throw new OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                assert(userState === 'normal');
            }
            return true;
        }
        throw new OakUnloggedInException('您尚未登录');
    }
}