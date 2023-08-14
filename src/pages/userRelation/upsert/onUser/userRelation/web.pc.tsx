import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../../oak-app-domain';
import { Checkbox } from 'antd';

export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    relations2: {
        relation: EntityDict['relation']['OpSchema'];
        isChecked: boolean;
    }[];
}, {
    onRelationChange: (relation: EntityDict['relation']['OpSchema'], checked: boolean) => void;
}>) {
    const { entity, relations2 } = props.data;
    const { t, onRelationChange } = props.methods;
    return (
        <>
            {
                relations2?.map(
                    ({ relation, isChecked }) => (
                        <Checkbox
                            checked={isChecked}
                            value={relation}
                            onChange={({ target }) => {
                                const { checked } = target;
                                onRelationChange(relation, checked);
                            }}
                        >
                            {relation.name ? t(`${entity}:r.${relation.name}`) : relation.display}
                        </Checkbox>
                    )
                )
            }
        </>
    );
}