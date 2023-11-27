import { Typography, Radio, Checkbox, List, Divider, Flex, Space } from 'antd';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { relations, rows, rule, onPickRelations, onPickRows, pickedRowIds, pickedRelationIds, entity, disablePickRow, disablePickRelation, pickRelationRule, disabled, } = props.data;
    const { t } = props.methods;
    if (rows?.length > 0 && relations?.length > 0) {
        const Row = rows.length === 1 ? (rows[0].value ? (<>
                        <Divider orientation="left">
                            {t(`${entity}:name`)}
                        </Divider>
                        <Space>
                            <Typography.Title>{rows[0].value}</Typography.Title>
                        </Space>
                    </>) : null) : (<>
                    <Divider orientation="left">
                        {t('pickRow', { entity: t(`${entity}:name`) })}
                    </Divider>
                    <Checkbox.Group value={pickedRowIds || []} disabled={disablePickRow || disabled} onChange={(val) => onPickRows(val)}>
                        {rows.map((row) => (<Checkbox value={row.id}>{row.value}</Checkbox>))}
                    </Checkbox.Group>
                </>);
        const Relation = (<>
                <Divider orientation="left">
                    {t(`pickRelation.${pickRelationRule}`)}
                </Divider>
                <List>
                    {rule !== 'single' ? (<Checkbox.Group value={pickedRelationIds || []} disabled={disablePickRelation || disabled} onChange={(val) => onPickRelations(val)}>
                            {relations.map((relation) => (<Checkbox value={relation.id}>
                                    {t(`${entity}:r.${relation.name}`)}
                                </Checkbox>))}
                        </Checkbox.Group>) : (<Radio.Group onChange={(e) => {
                    const val = e.target.value;
                    onPickRelations([val]);
                }} value={pickedRelationIds?.[0] || undefined}>
                            {relations.map((relation) => (<Radio value={relation.id}>
                                    {t(`${entity}:r.${relation.name}`)}
                                </Radio>))}
                        </Radio.Group>)}
                </List>
            </>);
        return (<Flex vertical className={Styles.container}>
                {Row}
                {Relation}
            </Flex>);
    }
    return null;
}
