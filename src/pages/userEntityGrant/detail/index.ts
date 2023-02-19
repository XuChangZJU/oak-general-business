
export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        qrCodeType: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        expired: 1,
        expiresAt: 1,
        wechatQrCode$entity: {
            $entity: 'wechatQrCode',
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                type: 1, //类型
                ticket: 1,
                url: 1,
                buffer: 1,
                expired: 1,
                expiresAt: 1,
                applicationId: 1,
            },
            filter: {
                entity: 'userEntityGrant',
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: ({ data: userEntityGrant }) => {
        let qrCodeUrl = userEntityGrant?.wechatQrCode$entity![0]?.url;
        const buffer = userEntityGrant?.wechatQrCode$entity![0]?.buffer;
        if (buffer) {
            const newBuffer = new ArrayBuffer(buffer.length * 2);
            const newBufferToUint16 = new Uint16Array(newBuffer);
            for (let i = 0; i < buffer.length; i++) {
                newBufferToUint16[i] = buffer.charCodeAt(i);
            }

            if (process.env.OAK_PLATFORM === 'wechatMp') {
                const base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                qrCodeUrl = 'data:image/png;base64,' + base64Str;
            } else {
                let binary = '';
                const bytes = new Uint8Array(newBufferToUint16);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const base64Str = window.btoa(binary);
                // const buffer2 = Buffer.from(newBufferToUint16, 'base64');
                // const base64Str = buffer2.toString('base64');

                qrCodeUrl = 'data:image/png;base64,' + base64Str;
            }
        }
        return {
            relation: userEntityGrant?.relation,
            entity: userEntityGrant?.entity,
            url: qrCodeUrl,
            expired: userEntityGrant?.expired,
            expiresAt: userEntityGrant?.expiresAt,
        };
    },
});