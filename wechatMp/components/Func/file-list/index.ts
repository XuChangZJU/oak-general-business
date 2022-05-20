import { isMockId } from "oak-frontend-base/src/utils/mockId";

Component({
    data: {
        selected: -1,
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
    },
    externalClasses: ['l-class', 'l-item-class'],
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
        // 图片显示模式
        mode: {
            type: String,
            value: 'aspectFit',
        },
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
        },
        // 每行可显示的个数
        size: {
            type: Number,
            value: 3,
        },
    },

    methods: {
        /**
         * 获取组件内部节点位置信息（单个）
         * @param component 组件实例
         * @param selector {String} css选择器
         * @returns boundingClientRect() 回调函数的值
         */
        async getNodeRectFromComponent(component: any, selector: any) {
            return await new Promise((resolve) => {
                component
                    .createSelectorQuery()
                    .select(selector)
                    .boundingClientRect((res: any) => {
                        resolve(res);
                    })
                    .exec();
            });
        },
        /**
        //  * px 转 rpx
        //  * @param px 像素值
        //  */
        px2rpx(px: number) {
            const windowWidth = wx.getSystemInfoSync().windowWidth;
            return (750 / windowWidth) * px;
        },
        async onPick() {
            const { selectCount, mediaType, sourceType, oakUpdateData } =
                this.data;
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
                } else {
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
            } catch (err: any) {
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
            const {
                globalData: { features },
            } = getApp();
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
            const {
                globalData: { features },
            } = getApp();
            options.forEach((ele) =>
                features.runningNode.addNode(
                    Object.assign(
                        {
                            parent: this.data.oakFullpath,
                        },
                        ele
                    )
                )
            );
        },
        onItemTapped(event: WechatMiniprogram.Touch) {
            const { index } = event.currentTarget.dataset;
            if (this.data.selected === index) {
                this.setData({
                    selected: -1,
                });
            } else {
                this.setData({
                    selected: index,
                });
            }
        },
        async onDelete(event: WechatMiniprogram.Touch) {
            const {
                globalData: { features },
            } = getApp();
            const { value, index } = event.currentTarget.dataset;
            const { id } = value;
            if (isMockId(id)) {
                features.runningNode.removeNode({
                    parent: this.data.oakFullpath,
                    path: `${index}`,
                });
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                console.log(result);
            }
        },
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
        },
        /**
         * size 属性变化时，重新调整图片大小
         * @param size 新值
         */
        size: async function (size: number) {
            if (!size) {
                this.setData({ itemSizePercentage: '' });
                return;
            }

            // 获取 .file-list__container 容器宽度
            const res: any = await this.getNodeRectFromComponent(
                this,
                '.file-list__container'
            );
            const widthRpx = this.px2rpx((res.right - res.left));

            // 根据容器宽度计算单张图片宽度百分比
            const itemSizePercentage = (10 / size) * 10 - (20 / widthRpx) * 100 + '%;';
            this.setData({ itemSizePercentage: itemSizePercentage });
        },
    },

    lifetimes: {
        ready() {
            this.checkAllowInsert();
            if (this.data.oakParent) {
                this.setFullpath(this.data.oakParent);
            }
        },
    },
});
