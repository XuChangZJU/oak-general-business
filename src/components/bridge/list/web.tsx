import * as React from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import ActionBtnPanel from 'oak-frontend-base/es/components/actionBtnPanel';
import { EntityDict } from '../../../oak-app-domain';
import Style from './web.module.less';
import BridgeIdDetail from '../detail';

import { useState } from 'react';
export default function render(
    props: WebComponentProps<
        EntityDict,
        'bridge',
        true,
        {
            searchValue: string;
            nameLabel: string;
            list: RowWithActions<EntityDict, 'userEntityGrant'>[];
        },
        {
            cancel: () => void;
            getQrCode: () => Promise<void>;
        }
    >
) {
    const {
        oakPagination,
        oakFullpath,
        list = [],
        oakLoading,
        nameLabel,
    } = props.data;


    const { pageSize, total, currentPage } = oakPagination || {};

    const { t, setPageSize, setCurrentPage, updateItem, execute, getQrCode } = props.methods;
    const [qrCodeOpen, setQrCodeOpen] = useState(false);
    const [bridgeId, setBridgeId] = useState('');
    return (
        <>
            <Table
                loading={oakLoading}
                dataSource={list}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: '$$createAt$$',
                        title: '创建时间',
                        render: (value, record, index) => {
                            return dayjs(value).format('YYYY-MM-DD HH:mm');
                        },
                    },
                    {
                        dataIndex: 'expired',
                        title: '状态',
                        render: (value, record, index) => {
                            return (
                                <Typography.Text
                                    type={record.expired ? 'danger' : 'success'}
                                >
                                    {record.expired ? '失效' : '有效'}
                                    {!record.expired && (
                                        <Typography.Text>
                                            &nbsp;
                                            {dayjs(record.expiresAt).format(
                                                'YYYY-MM-DD HH:mm'
                                            )}
                                        </Typography.Text>
                                    )}
                                </Typography.Text>
                            );
                        },
                    },
                    // {
                    //     dataIndex: 'op',
                    //     width: 200,
                    //     title: '操作',
                    //     align: 'center',
                    //     render: (value, record, index) => {
                    //         return (
                    //             <>
                    //                 <Button
                    //                     type="link"
                    //                     onClick={() => {
                    //                         updateItem(
                    //                             {
                    //                                 expired: true
                    //                             },
                    //                             record.id!,
                    //                             'cancel'
                    //                         );
                    //                         execute();
                    //                     }}
                    //                 >
                    //                     失效
                    //                 </Button>
                    //             </>
                    //         );
                    //     },
                    //     fixed: 'right',
                    // },
                    {
                        width: 200,
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render: (value, record, rowIndex) => {
                            return (
                                <ActionBtnPanel
                                    mode="table-cell"
                                    entity="parasite"
                                    items={[
                                        {
                                            label: '失效',
                                            action: 'cancel',
                                            // alerted: true,
                                            show: record[
                                                '#oakLegalActions'
                                            ]?.includes('cancel'),
                                            onClick: () => {
                                                updateItem(
                                                    { expired: true },
                                                    record.id!,
                                                    'cancel'
                                                );
                                                execute();
                                            },
                                        },
                                        {
                                            label: '二维码',
                                            action: 'qrcode',
                                            show: record[
                                                '#oakLegalActions'
                                            ]?.includes('qrcode'),
                                            // alerted: true,
                                            onClick: async () => {
                                                setBridgeId(record.id!);
                                                setQrCodeOpen(true);
                                            },
                                        },
                                    ]}
                                />
                            );
                        },
                    },
                ]}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize: number) => {
                        setPageSize(pageSize);
                    },
                    onChange: (current: number) => {
                        setCurrentPage(current);
                    },
                }}
            />
            <Modal
                width={786}
                open={qrCodeOpen}
                destroyOnClose={true}
                onCancel={() => {
                    setQrCodeOpen(false);
                }}
                footer={null}
            >
                <BridgeIdDetail
                    oakId={bridgeId}
                    oakAutoUnmount={true}
                    oakPath="$bridge/list-bridge/detail"
                />
            </Modal>
        </>
    );
}
