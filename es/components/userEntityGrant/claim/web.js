import { NoticeBar, List, Button } from 'antd-mobile';
import UbPicker from './ubPicker';
import Styles from './web.module.less';
export default function Render(props) {
    const { userEntityGrant, picker: Picker, isGranter, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable, hideTip } = props.data;
    const { t, onPickRelations, onPickRows, claim } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired } = userEntityGrant;
        const Picker2 = Picker || UbPicker;
        return (<div className={Styles.container}>
                {(!hideTip && !isGranter && !hasClaimed) && <NoticeBar content={t('tip')} color='info'/>}
                {isGranter && <NoticeBar content={t('isGranter')} color='error'/>}
                {hasClaimed && <NoticeBar content={t('hasClaimed')} color='error'/>}
                {!hideInfo && <div className={Styles.info}>
                    <List mode='card' header={t('source')}>
                        <List.Item extra={userEntityGrant.granter.name || userEntityGrant.granter.nickname}>
                            {t('granterName')}
                        </List.Item>
                       {/*  <List.Item extra={t(`${userEntityGrant.relationEntity as string}:name`)}>
                     {t('userEntityGrant:attr.relationEntity')}
                 </List.Item> */}
                        <List.Item extra={expired ? t('expired') : counterStr}>
                            {expired ? t('isExpired') : t('counter')}
                        </List.Item>
                    </List>
                </div>}
                <Picker2 disabled={!!expired || hasClaimed || isGranter} entity={relationEntity} entityFilter={relationEntityFilter} rule={rule} ruleOnRow={ruleOnRow} relationIds={relationIds} onPickRows={onPickRows} onPickRelations={onPickRelations} pickedRelationIds={pickedRelationIds} pickedRowIds={pickedRowIds} oakPath="$uegClaim-content"/>
                <div style={{ flex: 1 }}/>
                <Button block color={isGranter || hasClaimed ? 'danger' : (!expired ? 'primary' : 'warning')} disabled={oakExecutable !== true || !!expired || isGranter || hasClaimed} onClick={() => claim()}>
                    {isGranter ? t('isGranter') : (hasClaimed ? t('hasClaimed') : (!expired ? t('userEntityGrant:action.claim') : t('expired')))}
                </Button>
            </div>);
    }
    return null;
}
