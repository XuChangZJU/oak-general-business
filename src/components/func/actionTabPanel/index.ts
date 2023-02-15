import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity() {
        const { entity } = this.props;
        return entity as keyof EntityDict;
    },
    isList: false,
    actions() {
        const { items } = this.props;
        const actions =
            items?.filter((ele) => !!ele.action).map((ele) => ele.action) || [];
        return actions;
    },
    data: {
        slideWidth: 0, //小程序使用
        slideLeft: 0, //小程序使用
        slideShow: false, //小程序使用
        commonAction: [
            'create',
            'update',
            'remove',
            'confirm',
            'cancel',
            'grant',
            'revoke',
        ],
    },
    properties: {
        entity: String,
        actions: {
            type: Array,
            value: [],
        },
        items: {
            type: Array,
            value: [],
        },
        rows: {
            type: Number,
            value: 2,
        },
        column: {
            type: Number,
            value: 5,
        },
        mode: {
            type: String,
            value: 'text',
        },
    },
    lifetimes: {
        ready: function () {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.getItemsMp();
            }
        },
    },
    observers: {
        oakLegalActions: function (value) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                if (value) {
                    this.getItemsMp();
                }
            }
        },
    },
    methods: {
        async linconfirm() {
            const { selectItem, oakId } = this.state;
            const detail = {
                item: selectItem,
                oakId,
            };
            if (selectItem.click) {
                this.triggerEvent('click', detail);
                return;
            }
            await this.execute(
                selectItem.action as EntityDict[keyof EntityDict]['Action']
            );
            if (selectItem.afterAction) {
                this.triggerEvent('afterAction', detail);
            }
        },
        async lincancel() {
            this.setState({
                selectItem: '',
            });
        },
        getActionName(action: string) {
            const { entity } = this.props;
            const { commonAction } = this.state;
            let text: string = '';

            if (action) {
                if (commonAction.includes(action)) {
                    text = this.t(`common:action.${action}`);
                } else {
                    text = this.t(`${entity}:action.${action}`);
                }
            }
            return text;
        },
        async handleClick(e: WechatMiniprogram.Touch) {
            const { oakId } = this.state;
            const { item } = e.currentTarget.dataset;
            if (item.alerted) {
                const dialog = (this as any).selectComponent(
                    '#my-action-tab-dialog'
                );

                let alertContent = '';
                if (item.action) {
                    const text = this.getActionName(item.action);
                    alertContent = `确认${text}该数据`;
                }

                dialog.linShow({
                    title: item.alertTitle || '温馨提示',
                    type: 'confirm',
                    content: item.alertContent || alertContent,
                    'confirm-text': item.confirmText || '确定',
                    'cancel-text': item.cancelText || '取消',
                });
                this.setState({
                    selectItem: item,
                });
                return;
            }
            const detail = {
                item,
                oakId,
            };
            if (item.click) {
                this.triggerEvent('click', detail);
                return;
            }
            await this.execute(
                item.action as EntityDict[keyof EntityDict]['Action']
            );
            if (item.afterAction) {
                this.triggerEvent('afterAction', detail);
            }
        },
        scroll(e: WechatMiniprogram.Touch) {
            this.setData({
                slideLeft: e.detail.scrollLeft * this.state.slideRatio,
            });
        },
        getItemsMp() {
            const { oakLegalActions, items, rows, column } = this.state;
            const items2 = items
                .filter((ele: any) => {
                    const { action, filter } = ele;
                    const authResult =
                        !action ||
                        (action &&
                            oakLegalActions?.includes(
                                action as EntityDict[keyof EntityDict]['Action']
                            ));
                    const filterResult =
                        ele.hasOwnProperty('filter') && filter
                            ? filter()
                            : true;
                    return authResult && filterResult;
                })
                .map((ele: any) => {
                    const { label, action } = ele;
                    let text: string | undefined;
                    if (label) {
                        text = label;
                    } else {
                        text = this.getActionName(action);
                    }
                    return Object.assign(ele, {
                        text: text,
                    });
                });
            const count = rows * column;
            let num = 1;
            if (items2.length > 0) {
                num =
                    items2.length % count !== 0
                        ? parseInt((items2.length / count).toString(), 10) + 1
                        : items2.length / count;
            }
            const tabNums = [];
            for (let i = 1; i <= num; i++) {
                tabNums.push(i);
            }

            const res = wx.getSystemInfoSync();
            const _totalLength = tabNums.length * 750; //分类列表总长度
            const _ratio = (100 / _totalLength) * (750 / res.windowWidth); //滚动列表长度与滑条长度比例
            const _showLength = (750 / _totalLength) * 100; //当前显示红色滑条的长度(保留两位小数)

            this.setState({
                tabNums,
                slideWidth: _showLength,
                totalLength: _totalLength,
                slideShow: num > 1,
                slideRatio: _ratio,
                newItems: items2,
                count,
            });
        },
    },
});
