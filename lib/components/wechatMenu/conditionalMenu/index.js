"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'wechatMenu',
    projection: {
        id: 1,
        menuConfig: 1,
        applicationId: 1,
        iState: 1,
        wechatPublicTagId: 1,
        menuId: 1,
    },
    formData({ data: rows }) {
        return {
            id: rows?.[0]?.id,
            config: rows?.[0]?.menuConfig,
            menuId: rows?.[0]?.menuId,
            iState: rows?.[0]?.iState,
        };
    },
    properties: {
        applicationId: '',
        tagId: '',
        wechatId: '',
        menuType: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId, tagId, wechatId } = this.props;
            const { data: conditionalmenu } = await this.features.cache.refresh('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    menuId: 1,
                    wechatPublicTagId: 1,
                    applicationId: 1,
                    iState: 1,
                },
                filter: {
                    applicationId,
                    wechatPublicTagId: tagId
                }
            });
            if (!conditionalmenu[0]) {
                this.addItem({
                    wechatPublicTagId: tagId,
                    menuConfig: { button: [], matchrule: { tag_id: wechatId } },
                    applicationId,
                });
            }
        }
    },
    filters: [
        {
            filter() {
                const { applicationId, tagId } = this.props;
                return {
                    applicationId,
                    wechatPublicTagId: tagId
                };
            }
        },
    ],
    methods: {},
});
