import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { Typography, Radio, Checkbox, List, Divider, Flex, Space } from 'antd';
import { EntityDict } from '../../../../oak-app-domain';
import Styles from './web.pc.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            relations: EntityDict['relation']['OpSchema'][];
            rows: Array<{
                id: string;
                value: string;
            }>;
            rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
            onPickRelations: (ids: string[]) => void;
            onPickRows: (ids: string[]) => void;
            pickedRowIds?: string[];
            pickedRelationIds?: string[];
            entity: string;
            disabled?: boolean;
            disablePickRow?: boolean;
            disablePickRelation?: boolean;
            pickRelationRule: string;
        }
    >
) {
    const {
        relations,
        rows,
        rule,
        onPickRelations,
        onPickRows,
        pickedRowIds,
        pickedRelationIds,
        entity,
        disablePickRow,
        disablePickRelation,
        pickRelationRule,
        disabled,
    } = props.data;
    const { t } = props.methods;

    if (rows?.length > 0 && relations?.length > 0) {
        const Row =
            rows.length === 1 ? (
                rows[0].value ? (
                    <>
                        <Divider orientation="left">
                            {t(`${entity}:name`)}
                        </Divider>
                        <Space>
                            <Typography.Title>{rows[0].value}</Typography.Title>
                        </Space>
                    </>
                ) : null
            ) : (
                <>
                    <Divider orientation="left">
                        {t('pickRow', { entity: t(`${entity}:name`) })}
                    </Divider>
                    <Checkbox.Group
                        value={pickedRowIds || []}
                        disabled={disablePickRow || disabled}
                        onChange={(val) => onPickRows(val as string[])}
                    >
                        {rows.map((row) => (
                            <Checkbox value={row.id}>{row.value}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </>
            );
        const Relation = (
            <>
                <Divider orientation="left">
                    {t(`pickRelation.${pickRelationRule}`)}
                </Divider>
                <List>
                    {rule !== 'single' ? (
                        <Checkbox.Group
                            value={pickedRelationIds || []}
                            disabled={disablePickRelation || disabled}
                            onChange={(val) => onPickRelations(val as string[])}
                        >
                            {relations.map((relation) => (
                                <Checkbox value={relation.id}>
                                    {t(`${entity}:r.${relation.name}`)}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    ) : (
                        <Radio.Group
                            onChange={(e) => {
                                const val = e.target.value;
                                onPickRelations([val]);
                            }}
                            value={pickedRelationIds?.[0] || undefined}
                        >
                            {relations.map((relation) => (
                                <Radio value={relation.id}>
                                    {t(`${entity}:r.${relation.name}`)}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </List>
            </>
        );
        return (
            <Flex vertical className={Styles.container}>
                {Row}
                {Relation}
            </Flex>
        );
    }
    return null;
}
