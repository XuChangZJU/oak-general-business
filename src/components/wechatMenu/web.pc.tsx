import React, { useState, useEffect } from 'react';
import WechatMenu from './menu';
import ConditionalMenu from './conditionalMenu';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import Style from './web.module.less';
import { Row, Col, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TagList from './tagList';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatMenu',
        true,
        {
            is_menu_open: boolean;
            applicationId: string;
            menuId: string;
            isPlatform: boolean;
            tabKey: string;
        },
        {
        }
    >
) {
    const { menuId, oakFullpath, is_menu_open, applicationId, isPlatform, tabKey } = props.data;
    const { } = props.methods;
    const [menuType, setMenuType] = useState('common');
    const [tag, setTag] = useState({} as { id: string, name: string, wechatId: string });

    const getTag = (tag: { id: string, name: string, wechatId: string }) => {
        setTag(tag);
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '通用菜单',
            children: <WechatMenu
                menuId={menuId ? menuId : undefined}
                oakPath={'$wechatMenu'}
                applicationId={applicationId}
                oakAutoUnmount={true}
                menuType={menuType}
                tabKey={tabKey}
            />,
        },
        {
            key: '2',
            label: '个性化菜单',
            children:
                <div className={Style.conditionalMenu}>
                    <div className={Style.tagList}>
                        <TagList
                            oakAutoUnmount={true}
                            oakPath='$wechatPublicTag'
                            applicationId={applicationId}
                            getTag={getTag}
                        />
                    </div>
                    {
                        tag.id ? (
                            <ConditionalMenu
                                oakPath={`$conditionalMenu-${tag.id}`}
                                applicationId={applicationId}
                                oakAutoUnmount={true}
                                tagId={tag.id}
                                wechatId={tag.wechatId}
                                menuType={menuType}
                                tabKey={tabKey}
                            />
                        ) : (
                            <div className={Style.tagHelp}>请选择一个标签</div>
                        )
                    }
                </div>,
        },
    ];

    if (oakFullpath) {
        return (
            <div>
                {
                    is_menu_open && (
                        <div className={Style.tabs}>
                            {
                                isPlatform ? <WechatMenu
                                    menuId={menuId ? menuId : undefined}
                                    oakPath={'$wechatMenu'}
                                    applicationId={applicationId}
                                    oakAutoUnmount={true}
                                    menuType={menuType}
                                    tabKey={tabKey}
                                /> : <Tabs
                                    defaultActiveKey='1'
                                    items={items}
                                    onChange={(key: string) => {
                                        if (key === '1') {
                                            setMenuType('common');
                                        } else {
                                            setMenuType('conditional');
                                        }
                                    }}
                                />
                            }
                        </div>
                    )
                    //  : (
                    //     <div className={Style.container}>
                    //         <div className={Style.warn}>尚未开启菜单，请先前往微信公众平台开启。</div>
                    //     </div>
                    // )
                }
            </div>
        )
    }
    return null;
}