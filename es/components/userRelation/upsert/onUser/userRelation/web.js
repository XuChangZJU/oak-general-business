import React from 'react';
import { Checkbox } from 'antd-mobile';
export default function Render(props) {
    const { entity, relations2 } = props.data;
    const { t, onRelationChange } = props.methods;
    return (<>
            {relations2?.map(({ relation, isChecked }) => (<Checkbox style={{ marginRight: 20 }} checked={isChecked} onChange={(checked) => {
                onRelationChange(relation, checked);
            }}>
                            {relation.name ? t(`${entity}:r.${relation.name}`) : relation.display}
                        </Checkbox>))}
        </>);
}
