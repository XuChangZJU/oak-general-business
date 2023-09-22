import React, { useState, useEffect } from 'react';
import WechatMenu from './menu';
import ConditionalMenu from './conditionalMenu';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import Style from './web.module.less';
import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { WechatMpConfig, WechatPublicConfig } from '../../oak-app-domain/Application/Schema';
import { Row, Col, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
        },
        {
        }
    >
) {
    const { menuId, oakFullpath, is_menu_open, applicationId } = props.data;
    const { } = props.methods;
    const [menuType, setMenuType] = useState('common');
    const [tag, setTag] = useState({} as { id: string, name: string });

    const getTag = (tag: { id: string, name: string }) => {
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
                                oakPath={'$conditionalMenu'}
                                applicationId={applicationId}
                                oakAutoUnmount={true}
                                tagId={tag.id}
                                menuType={menuType}
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
                    is_menu_open ? (
                        <div className={Style.tabs}>
                            <Tabs
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
                        </div>
                    ) : (
                        <div className={Style.container}>
                            <div className={Style.warn}>尚未开启菜单，请先前往微信公众平台开启。</div>
                        </div>
                    )
                }
            </div>
        )
    }
    return null;
}