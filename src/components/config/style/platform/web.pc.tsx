import React from 'react';
import { Tabs, Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';

import { Style as StyleDef } from '../../../../types/Style';

import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import StyleUpsert from '../../style';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            entity: string;
            name: string;
            currentStyle: StyleDef;
            dirty: boolean;
        },
        {
            resetStyle: () => void;
            updateStyle: () => void;
            setValue: (style: StyleDef) => void;
        }
    >
) {
    const { entity, currentStyle, dirty, name } = props.data;
    const { resetStyle, updateStyle, setValue, t } =
        props.methods;
    return (
        <>
            <Affix offsetTop={64}>
                <Alert
                    message={
                        <div>
                            <text>
                                您正在更新
                                <Typography.Text
                                    keyboard
                                >
                                    {entity}
                                </Typography.Text>
                                对象
                                <Typography.Text
                                    keyboard
                                >
                                    {name}
                                </Typography.Text>
                                的样式，请谨慎操作
                            </text>
                        </div>
                    }
                    type="info"
                    showIcon
                    action={
                        <Space>
                            <Button
                                disabled={!dirty}
                                type="primary"
                                danger
                                onClick={() => resetStyle()}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                {t('common::reset')}
                            </Button>
                            <Button
                                disabled={!dirty}
                                type="primary"
                                onClick={() => updateStyle()}
                            >
                                {t('common::action.confirm')}
                            </Button>
                        </Space>
                    }
                />
            </Affix>
            <div className={Style.contains}>
                <StyleUpsert
                    value={currentStyle}
                    onChange={(s) => {
                        setValue(s)
                    }}
                />
            </div>
        </>
    );
}