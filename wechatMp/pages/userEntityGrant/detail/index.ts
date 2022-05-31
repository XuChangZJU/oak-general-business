
OakPage({
    path: 'userEntityGrant:detail',
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        wechatQrCode$entity: {
            $entity: 'wechatQrCode',
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                type: 1,//类型
                ticket: 1,
                url: 1,
                buffer: 1,
            },
            filter: {
                entity: 'userEntityGrant',
                expired: false,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: async ([userEntityGrant]) => {
        let qrcodeUrl;
        const str = userEntityGrant?.wechatQrCode$entity[0]?.buffer;
        console.log('str', str);
        if (str) {
            const buf = new ArrayBuffer(str.length * 2);
            const buf2 = new Uint16Array(buf);
            for (let i = 0; i < str.length; i++) {
                buf2[i] = str.charCodeAt(i);
            }
            qrcodeUrl = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(buf2);
            console.log('url', qrcodeUrl);
        }
        return {
            relation: userEntityGrant?.relation,
            url: qrcodeUrl || userEntityGrant?.wechatQrCode$entity[0]?.url
        }
    },
}, {
    data: {
    },
    lifetimes: {
    },
    methods: {
    }
});