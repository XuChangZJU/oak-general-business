import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { NoticeBar, Space, List, Button } from 'antd-mobile';
import UbPicker from './ubPicker';
import { EntityDict } from '../../../oak-app-domain';
import Styles from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            userEntityGrant: EntityDict['userEntityGrant']['Schema'];
            isGranter: boolean;
            hasClaimed: boolean;
            counterStr: string;
            hideInfo: boolean;
            hideTip: boolean;
            pickedRowIds?: string[],
            pickedRelationIds?: string[],
            picker?: (props: {
                disabled?: boolean,
                entity: keyof EntityDict,
                entityFilter: object,
                relationIds: string[],
                rule: EntityDict['userEntityGrant']['OpSchema']['rule'],
                ruleOnRow: EntityDict['userEntityGrant']['OpSchema']['ruleOnRow'],
                onPickRelations: (ids: string[]) => void,
                onPickRows: (id: string[]) => void,
                oakPath: string,
                pickedRowIds?: string[],
                pickedRelationIds?: string[],
            }) => React.ReactElement,
        },
        {
            onPickRelations: (ids: string[]) => void,
            onPickRows: (ids: string[]) => void,
            claim: () => void,
        }
    >
) {
    const { userEntityGrant, picker: Picker, isGranter, hasClaimed, counterStr, hideInfo, 
        pickedRowIds, pickedRelationIds, oakExecutable, hideTip } = props.data;
    const { t, onPickRelations, onPickRows, claim } = props.methods;

    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired } = userEntityGrant;

        const Picker2 = Picker || UbPicker;
        return (
            <div className={Styles.container}>
                {(!hideTip && !isGranter && !hasClaimed) && <NoticeBar content={t('tip')} color='info' />}
                {isGranter && <NoticeBar content={t('isGranter')} color='error' />}
                {hasClaimed && <NoticeBar content={t('hasClaimed')} color='error' />}
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
                <Picker2
                    disabled={!!expired || hasClaimed || isGranter}
                    entity={relationEntity as keyof EntityDict}
                    entityFilter={relationEntityFilter}
                    rule={rule}
                    ruleOnRow={ruleOnRow}
                    relationIds={relationIds}
                    onPickRows={onPickRows}
                    onPickRelations={onPickRelations}
                    pickedRelationIds={pickedRelationIds}
                    pickedRowIds={pickedRowIds}
                    oakPath="$uegClaim-content"
                />
                <div style={{ flex: 1 }} />
                <Button
                    block
                    color={isGranter || hasClaimed ? 'danger' : (!expired ? 'primary' : 'warning')}
                    disabled={oakExecutable !== true || !!expired || isGranter || hasClaimed}
                    onClick={() => claim()}
                >
                    {isGranter ? t('isGranter') : ( hasClaimed ? t('hasClaimed') : (!expired ? t('userEntityGrant:action.claim') : t('expired')))}
                </Button>
            </div>
        );
    }

    return null;
}