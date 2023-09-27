"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const IActionDef = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};
const entityDesc = {
    locales: {
        zh_CN: {
            name: '微信菜单',
            attr: {
                menuId: '菜单Id',
                menuConfig: '菜单配置',
                application: '应用',
                wechatPublicTag: '标签',
                iState: '状态',
            },
            action: {
                publish: '保存并发布',
                success: '发布成功',
                fail: '发布失败',
            },
            v: {
                iState: {
                    wait: '等待发布',
                    success: '发布成功',
                    fail: '发布失败',
                }
            }
        },
    },
};
