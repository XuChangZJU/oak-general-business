import React from 'react';
import { Alert, Space, List, Button, Row, Col, Divider, Flex } from 'antd';
import UbPicker from './ubPicker';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { userEntityGrant, picker: Picker, isGranter, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable, hideTip, } = props.data;
    const { t, onPickRelations, onPickRows, claim } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired, } = userEntityGrant;
        const Picker2 = Picker || UbPicker;
        return (<Row>
                <Col span={2}/>
                <Col span={20}>
                    <Flex vertical className={Styles.container}>
                        {!hideTip && !isGranter && !hasClaimed && (<Alert message={t('tip')} type="info" showIcon/>)}
                        {isGranter && (<Alert message={t('isGranter')} type="error" showIcon/>)}
                        {hasClaimed && (<Alert message={t('hasClaimed')} type="error" showIcon/>)}
                        {!hideInfo && (<div className={Styles.info}>
                                <Divider orientation="left">
                                    {t('source')}
                                </Divider>

                                <List itemLayout="horizontal">
                                    <List.Item>
                                        <List.Item.Meta title={t('granterName')}></List.Item.Meta>
                                        {userEntityGrant.granter.name ||
                    userEntityGrant.granter.nickname}
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta title={expired
                    ? t('isExpired')
                    : t('counter')}></List.Item.Meta>
                                        {expired ? t('expired') : counterStr}
                                    </List.Item>
                                </List>
                            </div>)}
                        <Picker2 disabled={!!expired || hasClaimed || isGranter} entity={relationEntity} entityFilter={relationEntityFilter} rule={rule} ruleOnRow={ruleOnRow} relationIds={relationIds} onPickRows={onPickRows} onPickRelations={onPickRelations} pickedRelationIds={pickedRelationIds} pickedRowIds={pickedRowIds} oakPath="$uegClaim-content"/>
                        <Space style={{ justifyContent: 'center' }}>
                            <Button color={isGranter || hasClaimed
                ? 'danger'
                : !expired
                    ? 'primary'
                    : 'warning'} disabled={oakExecutable !== true ||
                !!expired ||
                isGranter ||
                hasClaimed} onClick={() => claim()}>
                                {isGranter
                ? t('isGranter')
                : hasClaimed
                    ? t('hasClaimed')
                    : !expired
                        ? t('userEntityGrant:action.claim')
                        : t('expired')}
                            </Button>
                        </Space>
                    </Flex>
                </Col>
                <Col span={2}/>
            </Row>);
    }
    return null;
}
