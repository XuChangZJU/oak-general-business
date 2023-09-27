import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import SystemDetail from '../detail';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style';
import DomainList from '../../domain/list';
export default function Render(props) {
    const { id, config, oakFullpath, name, style } = props.data;
    const { t, update } = props.methods;
    if (id && oakFullpath) {
        return (_jsx(Tabs, { items: [
                {
                    label: t('detail'),
                    key: 'detail',
                    children: (_jsx(SystemDetail, { oakId: id })),
                },
                {
                    label: t('config'),
                    key: 'detail',
                    children: (_jsx(ConfigUpsert, { entity: "system", entityId: id, config: config, name: name })),
                },
                {
                    label: t('style'),
                    key: 'detail',
                    children: (_jsx(StyleUpsert, { value: style, onChange: (s) => {
                            update({ style: s });
                        } })),
                },
                {
                    label: t('domain-list'),
                    key: 'domain_list',
                    children: (_jsx(DomainList, { oakPath: `${oakFullpath}.domain$system` })),
                },
            ] }));
    }
}
