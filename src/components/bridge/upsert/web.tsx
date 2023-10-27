import React from 'react';
import {
    Form,
    Space,
    Button,
    Input,
    InputNumber,
    Typography,
    AutoComplete,
} from 'antd';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import BridgeDetail from '../detail';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'bridge',
        false,
        {
            entity: keyof EntityDict;
            entityId: string;
            relation: string;
            period: number;
            bridgeId: string;
            options: { value: string }[];
            nameLabel: string;
            nameRequired: boolean;
        },
        {
            search: (value: string) => void;
            setPeriod: (period: number) => void;
            confirm: () => void;
            setInit: () => void;
            onSearch: (value: string) => void;
            onSelect: (value: string) => void;
            setSearchValue: (value: string) => void;
        }
    >
) {
    const { methods, data } = props;
    const {
        entity,
        entityId,
        relation,
        period,
        bridgeId,
        options,
        nameLabel,
        nameRequired,
    } = props.data;
    const { setPeriod, confirm, setInit, onSelect, onSearch, setSearchValue } =
        methods;

    if (!!bridgeId) {
        return (
            <div className={Style.container}>
                <BridgeDetail
                    oakId={bridgeId}
                    oakAutoUnmount={true}
                    oakPath="$bridge/upsert-bridge/detail"
                />
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() => {
                            setInit();
                        }}
                    >
                        重新生成
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={Style.container}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    {/* <Form.Item label={nameLabel || '名称'} required={nameRequired}>
                        <>
                            <AutoComplete
                                options={options}
                                style={{ width: 200 }}
                                onSelect={onSelect}
                                onSearch={(text) => onSearch(text)}
                                placeholder="请输入"
                                onChange={(value) => {
                                    setSearchValue(value);
                                }}
                            />
                        </>
                    </Form.Item> */}
                    <Form.Item label="有效期" required>
                        <>
                            <InputNumber
                                min={1}
                                max={30}
                                placeholder="请输入"
                                onChange={(value) => {
                                    setPeriod(value!);
                                }}
                                value={period}
                                addonAfter={<Typography>天</Typography>}
                            ></InputNumber>
                        </>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    confirm();
                                }}
                            >
                                提交
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
