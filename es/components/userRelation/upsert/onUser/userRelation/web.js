import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox } from 'antd-mobile';
export default function Render(props) {
    const { entity, relations2 } = props.data;
    const { t, onRelationChange } = props.methods;
    return (_jsx(_Fragment, { children: relations2?.map(({ relation, isChecked }) => (_jsx(Checkbox, { style: { marginRight: 20 }, checked: isChecked, onChange: (checked) => {
                onRelationChange(relation, checked);
            }, children: relation.name ? t(`${entity}:r.${relation.name}`) : relation.display }))) }));
}
