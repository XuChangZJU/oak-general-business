import React from 'react';
import { Checkbox } from 'antd';
export default function Render(props) {
    const { entity, relations2 } = props.data;
    const { t, onRelationChange } = props.methods;
    return (<>
            {relations2?.map(({ relation, isChecked }) => (<Checkbox checked={isChecked} value={relation} onChange={({ target }) => {
                const { checked } = target;
                onRelationChange(relation, checked);
            }}>
                            {relation.name ? t(`${entity}:r.${relation.name}`) : relation.display}
                        </Checkbox>))}
        </>);
}
