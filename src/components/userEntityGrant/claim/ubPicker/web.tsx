import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { Form, CheckList, Radio, Checkbox, List } from 'antd-mobile';
import { EntityDict } from '../../../../oak-app-domain';
import Styles from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            relations: EntityDict['relation']['OpSchema'][];
            rows: Array<{
                id: string,
                value: string,
            }>;
            rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
            onPickRelations: (ids: string[]) => void,
            onPickRows: (ids: string[]) => void,
            pickedRowIds?: string[],
            pickedRelationIds?: string[]
            entity: string;
            disabled?: boolean;
            disablePickRow?: boolean;
            disablePickRelation?: boolean;
            pickRelationRule: string;
        }
    >
) {
    const { relations, rows, rule, onPickRelations, onPickRows, pickedRowIds, pickedRelationIds,
        entity, disablePickRow, disablePickRelation, pickRelationRule, disabled } = props.data;
    const { t } = props.methods;

    if (rows?.length > 0 && relations?.length > 0) {
        const Row = rows.length === 1 ?
            rows[0].value ? (
                <List mode='card' header={t(`${entity}:name`)}>
                    <List.Item>
                        <div className={Styles.singleRowValue}>{rows[0].value}</div>
                    </List.Item>
                </List>
            ) : <></>       // 没value干脆不渲染，渲染id会给用户造成疑惑
            : (
                <div>
                    <Form.Header>{t('pickRow', { entity: t(`${entity}:name`) })}</Form.Header>
                    <CheckList
                        value={pickedRowIds || []}
                        disabled={disablePickRow || disabled}
                        onChange={(val) => onPickRows(val as string[])}
                    >
                        {
                            rows.map(
                                (row) => (
                                    <CheckList.Item value={row.id}>
                                        {row.value}
                                    </CheckList.Item>
                                )
                            )
                        }
                    </CheckList>
                </div>
            );
        const Relation = (
            <div>
                <List mode='card' header={t(`pickRelation.${pickRelationRule}`)}>
                    <CheckList
                        multiple={rule !== 'single'}
                        value={pickedRelationIds || []}
                        disabled={disablePickRelation || disabled}
                        onChange={(val) => onPickRelations(val as string[])}
                    >
                        {
                            relations.map(
                                (relation) => (
                                    <CheckList.Item value={relation.id}>
                                        {t(`${entity}:r.${relation.name}`)}
                                    </CheckList.Item>
                                )
                            )
                        }
                    </CheckList>
                </List>
            </div>
        );
        return (
            <div className={Styles.container}>
                {Row}
                {Relation}
            </div>
        );
    }
    return null;
}