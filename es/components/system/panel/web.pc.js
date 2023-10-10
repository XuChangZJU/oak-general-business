import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import SystemDetail from '../detail';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style/platform';
import DomainList from '../../domain/list';
import ApplicationList from '../application';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { id, config, oakFullpath, name, style, application$system: applications } = props.data;
    const { t, update, addItem, removeItem } = props.methods;
    if (id && oakFullpath) {
        return (_jsx("div", { className: Styles.container, children: _jsx(Tabs, { tabPosition: 'left', items: [
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: (_jsx(SystemDetail, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('config') }),
                        key: 'config',
                        children: (_jsx(ConfigUpsert, { entity: "system", entityId: id, config: config, name: name })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('style') }),
                        key: 'style',
                        children: (_jsx(StyleUpsert, { style: style, entity: 'system', entityId: id, name: name })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('application-list') }),
                        key: 'application',
                        children: (_jsx(ApplicationList, { oakPath: `${oakFullpath}.application$system`, systemId: id })),
                    },
                    {
                        label: _jsx("div", { className: Styles.tabLabel, children: t('domain-list') }),
                        key: 'domain_list',
                        children: (_jsx(DomainList, { oakPath: `${oakFullpath}.domain$system`, systemId: id })),
                    },
                ] }) }));
    }
}
