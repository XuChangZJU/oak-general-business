import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import Styles from './web.pc.module.less';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style/platform';
import PlatformDetail from '../detail';
import PlatformSystem from '../system';
export default function render(props) {
    const { id, name, config, oakFullpath, style } = props.data;
    const { t, update } = props.methods;
    if (id && oakFullpath) {
        return (_jsx("div", { className: Styles.container, children: _jsx(Tabs, { tabPosition: 'left', items: [
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: (_jsx(PlatformDetail, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('config') }),
                        key: 'config',
                        children: (_jsx(ConfigUpsert, { entity: "platform", entityId: id, config: config, name: name })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('style') }),
                        key: 'style',
                        children: (_jsx(StyleUpsert, { style: style, entity: 'platform', entityId: id, name: name })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('system-list') }),
                        key: 'system',
                        children: (_jsx(PlatformSystem, { oakPath: `${oakFullpath}.system$platform`, platformId: id })),
                    },
                ] }) }));
    }
    return null;
}
