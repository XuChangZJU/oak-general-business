declare const _default: {
    address: {
        attr: {
            detail: string;
            area: string;
            phone: string;
            name: string;
            default: string;
            remark: string;
        };
    };
    application: {
        attr: {
            description: string;
            type: string;
            system: string;
            name: string;
            config: string;
        };
        v: {
            type: {
                web: string;
                wechatPublic: string;
                wechatMp: string;
            };
        };
    };
    area: {
        attr: {
            level: string;
            depth: string;
            parent: string;
            name: string;
            code: string;
            center: string;
        };
        v: {
            level: {
                country: string;
                province: string;
                city: string;
                district: string;
                street: string;
            };
        };
    };
    extraFile: {
        attr: {
            origin: string;
            type: string;
            bucket: string;
            objectId: string;
            tag1: string;
            tag2: string;
            filename: string;
            md5: string;
            entity: string;
            entityId: string;
            extra1: string;
            extension: string;
            size: string;
        };
        v: {
            origin: {
                qiniu: string;
                unknown: string;
            };
            type: {
                image: string;
                pdf: string;
                video: string;
                audio: string;
                file: string;
            };
        };
    };
    mobile: {
        attr: {
            mobile: string;
            user: string;
            tokens: string;
        };
    };
    role: {
        attr: {
            name: string;
        };
        r: {
            owner: string;
        };
    };
    system: {
        attr: {
            name: string;
            description: string;
            config: string;
        };
        r: {
            owner: string;
        };
    };
    token: {
        attr: {
            application: string;
            entity: string;
            entityId: string;
            user: string;
            player: string;
            env: string;
        };
        action: {
            enable: string;
            disable: string;
        };
    };
    user: {
        attr: {
            name: string;
            nickname: string;
            birth: string;
            password: string;
            gender: string;
            avatar: string;
            idCardType: string;
            idNumber: string;
            ref: string;
            files: string;
        };
        action: {
            activate: string;
            play: string;
            accept: string;
            verify: string;
            reject: string;
            enable: string;
            disable: string;
            mergeTo: string;
            mergeFrom: string;
        };
        v: {
            userState: {
                shadow: string;
                normal: string;
                disabled: string;
                merged: string;
            };
            idState: {
                unverified: string;
                verifying: string;
                verified: string;
            };
            gender: {
                male: string;
                female: string;
            };
            idCardType: {
                "ID-Card": string;
                passport: string;
                "Mainland-passport": string;
            };
        };
    };
    userEntityGrant: {
        attr: {
            relation: string;
            entity: string;
            entityId: string;
            type: string;
            number: string;
            confirmed: string;
            remark: string;
            grantee: string;
            granter: string;
            files: string;
            expired: string;
            expiresAt: string;
        };
        action: {
            confirm: string;
        };
        v: {
            type: {
                grant: string;
                transfer: string;
            };
            iState: {
                init: string;
            };
        };
    };
    wechatQrCode: {
        attr: {
            entity: string;
            entityId: string;
            type: string;
            allowShare: string;
            tag: string;
            ticket: string;
            url: string;
            permanent: string;
            buffer: string;
            expired: string;
            expiresAt: string;
            application: string;
            props: string;
        };
        v: {
            type: {
                wechatMpDomainUrl: string;
                wechatMpWxaCode: string;
                wechatPublic: string;
                wechatPublicForMp: string;
            };
        };
    };
    wechatUser: {
        attr: {
            origin: string;
            openId: string;
            unionId: string;
            accessToken: string;
            sessionKey: string;
            subscribed: string;
            subscribedAt: string;
            unsubscribedAt: string;
            user: string;
            tokens: string;
            application: string;
        };
        v: {
            origin: {
                mp: string;
                public: string;
            };
        };
    };
};
export default _default;
