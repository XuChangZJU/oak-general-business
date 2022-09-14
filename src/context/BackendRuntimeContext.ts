import { SelectRowShape } from 'oak-domain/lib/types';
import { GetApplicationShape, GetTokeShape, RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import assert from 'assert';
import { OakTokenExpiredException, OakUserDisabledException } from '../types/Exceptions';
import { ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';

export type GetTokeShape2 = {
    id: 1,
    userId: 1,
    playerId: 1,
    ableState: 1,
    player: {
        id: 1,
        userState: 1,
        userRole$user: {
            $entity: 'userRole',
            data: {
                id: 1,
                userId: 1,
                roleId: 1,
            },
        },
    },
};

/**
 * general数据结构要求的后台上下文
 */
export class BackendRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> implements RuntimeContext<ED> {
    private application?: SelectRowShape<ED['application']['Schema'], GetApplicationShape>;
    private token?: SelectRowShape<ED['token']['Schema'], GetTokeShape>;
    private amIRoot?: boolean;
    private rootMode?: boolean;

    protected async initialize(data?: SerializedData) {
        if (data) {
            const { a: appId, t: tokenValue } = data;
            if (appId) {
                const { result } = await this.rowStore.select('application', {
                    data: {
                        id: 1,
                        name: 1,
                        config: 1,
                        type: 1,
                        systemId: 1,
                        system: {
                            id: 1,
                            name: 1,
                            config: 1,
                        },
                    },
                    filter: {
                        id: appId,
                    },
                }, this, {});
                assert(result.length > 0, `构建BackendRuntimeContext对应appId「${appId}」找不到application`);
                this.application = result[0] as SelectRowShape<ED['application']['Schema'], GetApplicationShape>;
            }
            if (tokenValue) {
                const { result } = await this.rowStore.select('token', {
                    data: {
                        id: 1,
                        userId: 1,
                        playerId: 1,
                        ableState: 1,
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
                    },
                    filter: {
                        id: tokenValue,
                    },
                }, this, {});
                assert(result.length > 0, `构建BackendRuntimeContext对应tokenValue「${tokenValue}user`);
                const token = result[0] as SelectRowShape<ED['token']['Schema'], GetTokeShape2>;
                if (token.ableState === 'disabled') {
                    throw new OakTokenExpiredException();
                }
                const { player } = token;
                const { userState, userRole$user} = player!;
                if (['disabled', 'merged'].includes(userState as string)) {
                    throw new OakUserDisabledException();
                }
                this.amIRoot = (userRole$user as any).length > 0 && (userRole$user as any).find(
                    (ele: any) => ele.role.name === 'root'
                );
                this.token = token;
            }
        }
        else {
            // 否则是后台模式，默认用root
            this.rootMode = true;
        }
    }

    async getApplicationId() {
        return this.application?.id;
    }

    async getSystemId() {
        return this.application?.systemId;
    }

    async getApplication() {
        return this.application;
    }

    async getTokenValue() {
        if (this.rootMode) {
            return ROOT_TOKEN_ID;
        }
        return this.token?.id;
    }

    async getToken() {
        return this.token;
    }

    async getCurrentUserId() {
        if (this.rootMode) {
            return ROOT_USER_ID as string;
        }
        return this.token?.userId as string;
    }

    async toString() {
        if (this.rootMode) {
            return JSON.stringify({ rootMode: true });
        }
        return JSON.stringify({ a: this.application?.id, t: this.token?.id });
    }

    async isRoot() {
        if (this.rootMode) {
            return true;
        }
        return !!this.amIRoot;
    }
}