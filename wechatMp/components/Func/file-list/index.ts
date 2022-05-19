Component({
    externalClasses: ['item-container', 'item'],
    properties: {
        oakUpdateData: Object,
        oakValue: Array,
        oakParent: String,
        oakPath: String,
        maxNumber: {
            type: Number,
            value: 100,
        },
        selectCount: {
            type: Number,
            value: 1,
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera'],
        },
        mediaType: {
            type: Array,
            value: ['image'],
        },
        disableInsert: Boolean,
    },

    methods: {
        async onPick() {
            const { selectCount, mediaType, sourceType, oakUpdateData } = this.data;
            try {
                const { errMsg, tempFiles } = await wx.chooseMedia({
                    count: selectCount,
                    mediaType,
                    sourceType,
                });
                if (errMsg !== 'chooseMedia:ok') {
                    this.triggerEvent('error', {
                        level: 'warning',
                        msg: errMsg,
                    });
                }
                else {
                    const result = this.triggerEvent('pick', tempFiles);
                    // console.log(result);
                    // this.properties.createData(tempFiles);
                   /*  const { globalData: { features } } = getApp();
                    const { oakFullpath } = this.data;
                    for (const file of tempFiles) {
                        await features.runningNode.addNode({
                            parent: oakFullpath,
                            fileCarrier: new WechatMpFileCarrier(file),
                            updateData: oakUpdateData,
                        });
                    } */
                }
            }
            catch (err: any) {
                console.error(err);
                if (err.errMsg !== 'chooseMedia:fail cancel') {
                    this.triggerEvent('error', {
                        level: 'error',
                        msg: err.errMsg,
                    });
                }
            }
        },
        checkAllowInsert(value?: Array<any>, num?: number) {
            const number2 = num || this.data.maxNumber;
            const value2 = value || this.data.oakValue;
            if (typeof number2 === 'number' && value2?.length >= number2) {
                this.setData({
                    disableInsert: true,
                });
            }
        },
        async setFullpath(oakParent: string) {
            const { globalData: { features }} = getApp();
            if (oakParent) {
                const oakFullpath = `${oakParent}.${this.data.oakPath}`;
                await features.runningNode.createNode({
                    path: this.data.oakPath,
                    parent: oakParent,
                });
                this.setData({
                    oakFullpath,
                });
            }
        },
        add(options: any[]) {
            const { globalData: { features }} = getApp();
            options.forEach(
                ele => features.runningNode.addNode(this.data.oakFullpath, ele)
            );
        }
    },

    observers: {
        oakValue: function (oakValue) {
            this.checkAllowInsert(oakValue);
        },
        maxNumber: function (maxNumber) {
            this.checkAllowInsert(undefined, maxNumber);
        },        
        oakParent: async function (oakParent) {
            await this.setFullpath(oakParent);
        }
    },

    lifetimes: {
        ready() {
            this.checkAllowInsert();
            if (this.data.oakParent) {
                this.setFullpath(this.data.oakParent);
            }
        }
    }
});
