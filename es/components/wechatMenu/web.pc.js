import React, { useState } from 'react';
import WechatMenu from './menu';
import ConditionalMenu from './conditionalMenu';
import Style from './web.module.less';
import { Tabs } from 'antd';
import TagList from './tagList';
export default function Render(props) {
    const { menuId, oakFullpath, is_menu_open, applicationId, isPlatform, tabKey } = props.data;
    const {} = props.methods;
    const [menuType, setMenuType] = useState('common');
    const [tag, setTag] = useState({});
    const getTag = (tag) => {
        setTag(tag);
    };
    const items = [
        {
            key: '1',
            label: '通用菜单',
            children: <WechatMenu menuId={menuId ? menuId : undefined} oakPath={'$wechatMenu'} applicationId={applicationId} oakAutoUnmount={true} menuType={menuType} tabKey={tabKey}/>,
        },
        {
            key: '2',
            label: '个性化菜单',
            children: <div className={Style.conditionalMenu}>
                    <div className={Style.tagList}>
                        <TagList oakAutoUnmount={true} oakPath='$wechatPublicTag' applicationId={applicationId} getTag={getTag}/>
                    </div>
                    {tag.id ? (<ConditionalMenu oakPath={`$conditionalMenu-${tag.id}`} applicationId={applicationId} oakAutoUnmount={true} tagId={tag.id} wechatId={tag.wechatId} menuType={menuType} tabKey={tabKey}/>) : (<div className={Style.tagHelp}>请选择一个标签</div>)}
                </div>,
        },
    ];
    if (oakFullpath) {
        return (<div>
                {is_menu_open && (<div className={Style.tabs}>
                            {isPlatform ? <WechatMenu menuId={menuId ? menuId : undefined} oakPath={'$wechatMenu'} applicationId={applicationId} oakAutoUnmount={true} menuType={menuType} tabKey={tabKey}/> : <Tabs defaultActiveKey='1' items={items} onChange={(key) => {
                        if (key === '1') {
                            setMenuType('common');
                        }
                        else {
                            setMenuType('conditional');
                        }
                    }}/>}
                        </div>)
            //  : (
            //     <div className={Style.container}>
            //         <div className={Style.warn}>尚未开启菜单，请先前往微信公众平台开启。</div>
            //     </div>
            // )
            }
            </div>);
    }
    return null;
}
