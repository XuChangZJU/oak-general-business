import { isMockId } from "oak-frontend-base/src/utils/mockId";

Component({
    data: {
        selected: -1,
    },
    externalClasses: ['item-container', 'item'],
    properties: {
        oakFullpath: String,
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
                ele => features.runningNode.addNode(Object.assign({
                    parent: this.data.oakFullpath,
                }, ele))
            );
        },
        onItemTapped(event: WechatMiniprogram.Touch) {
            const { index } = event.currentTarget.dataset;
            if (this.data.selected === index) {
                this.setData({
                    selected: -1,
                });
            }
            else {
                this.setData({
                    selected: index,
                });
            }
        },
        async onDelete(event: WechatMiniprogram.Touch) {
            const { globalData: { features }} = getApp();
            const { value, index } = event.currentTarget.dataset;
            const { id } = value;
            if (isMockId(id)) {
                features.runningNode.removeNode({
                    parent: this.data.oakFullpath,
                    path: `${index}`,
                })
            }
            else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',                    
                });
                console.log(result);
            }
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
