import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../../general-app-domain';
import { Checkbox } from 'antd';

export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    userRelations: Array<{
        relation: string;
    }>;
    relations: string[];
}, {
    onRelationChange: (relation: string, checked: boolean) => void;
    isChecked: (relation: string) => boolean;
}>) {
    const { entity, relations } = props.data;
    const { t, onRelationChange, isChecked } = props.methods;
    return (
        <>
            {
                relations?.map(
                    (relation) => (
                        <Checkbox
                            checked={isChecked(relation)}
                            value={relation}
                            onChange={({ target }) => {
                                const { checked } = target;
                                onRelationChange(relation, checked);
                            }}
                        >
                            {(t(`${entity}:r.${relation}`)) || relation}
                        </Checkbox>
                    )
                )
            }
        </>
    );
}