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
        mode: {
            type: String,
            value: 'cell',
        },
        column: {
            type: Number,
            value: 3,
        },
    },
    data: {
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
            const { item, type } = e.currentTarget.dataset;
            if (type === 'popover') {
                const popover = this.selectComponent('#popover');
                popover.onHide();
            }
            if (item.alerted) {
                const dialog = (this as any).selectComponent(
                    '#my-action-btn-dialog'
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
        getItemsMp() {
            const { oakLegalActions, items, column } = this.state;
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

            let newItems = items2;
            let moreItems = [];
            if (column && items2.length > column) {
                newItems = [...items2].splice(0, column);
                moreItems = [...items2].splice(column, items2.length);
            }

            this.setState({
                newItems,
                moreItems,
            });
        },
        handleMoreClick(e: WechatMiniprogram.Touch) {
            // 获取按钮元素的坐标信息
            var id = e.currentTarget.id;
            // let scrollTop = 0;
            // wx.createSelectorQuery()
            //     .selectViewport()
            //     .scrollOffset(function (res) {
            //         scrollTop = res.scrollTop;
            //     })
            //     .exec();
            const popover = this.selectComponent('#popover');
            wx.createSelectorQuery()
                .in(this as any)
                .select('#' + id)
                .boundingClientRect((res) => {
                    popover.onDisplay(res);
                })
                .exec();
        },
    },
});
