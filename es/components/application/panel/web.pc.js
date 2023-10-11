import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import ApplicationDetail from '../detail';
import ConfigUpsert from '../../config/application';
import StyleUpsert from '../../config/style/platform';
import TemplateList from '../../messageTypeTemplateId/list';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { id, config, oakFullpath, name, style, type } = props.data;
    const { t, update } = props.methods;
    if (id && oakFullpath) {
        return (_jsx("div", { className: Styles.container, children: _jsx(Tabs, { tabPosition: 'left', items: type === 'wechatPublic' ? [
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: (_jsx(ApplicationDetail, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('config') }),
                        key: 'config',
                        children: (_jsx(ConfigUpsert, { entity: "application", entityId: id, config: config || {}, name: name, type: config?.type })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('style') }),
                        key: 'style',
                        children: (_jsx(StyleUpsert, { style: style, entity: 'application', entityId: id, name: name })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('template') }),
                        key: 'template',
                        children: (_jsx(TemplateList, { oakAutoUnmount: true, oakPath: `templateUpsert-ApplicationId:${id}`, applicationId: id })),
                    },
                ] : [
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: (_jsx(ApplicationDetail, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('config') }),
                        key: 'config',
                        children: (_jsx(ConfigUpsert, { entity: "application", entityId: id, config: config || {}, name: name, type: config?.type })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('style') }),
                        key: 'style',
                        children: (_jsx(StyleUpsert, { style: style, entity: 'application', entityId: id, name: name })),
                    },
                ] }) }));
    }
}
