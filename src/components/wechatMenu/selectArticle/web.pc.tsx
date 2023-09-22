import React, { useState, useEffect, useRef } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input, Popover, Select } from 'antd';
const { TextArea } = Input;
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons'
import Style from './web.module.less';
import dayjs from 'dayjs';
import fs from 'fs';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import type { UploadFile } from 'antd/es/upload/interface';
import ShowNews from '../showNews';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        true,
        {
            type: string;
            materials: any[];
            total: number;
            getUrl: (url: string) => void;
            changeOpen: (open: boolean) => void;
        },
        {
            getArticleList: (page: number) => void;
            upload: (media: FormData, description?: FormData) => boolean;
        }
    >
) {
    const { changeOpen, materials, total, getUrl } = props.data;
    const { getArticleList, setMessage, upload } = props.methods
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([] as string[]);
    const selectRef = useRef<any>(null);
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'serial-number',
            title: '序号',
            render: (value, record, index) => {
                return index + 1;
            },
            width: 100
        },
        {
            dataIndex: 'url',
            title: '图文链接',
            render: (value, record, index) => {
                if (record.content.news_item.length > 1) {
                    const urlList = record.content.news_item.map((ele: any) => {
                        return ele.url
                    })
                    return (
                        <div>
                            <Select
                                ref={selectRef}
                                style={{ width: 160 }}
                                bordered={false}
                                value={urlList.includes(url) ? url : '请选择一篇文章'}
                                dropdownRender={() => <div className={Style.select}>
                                    {
                                        record.content.news_item.map((ele: any, index: number) => (
                                            <Popover
                                                content={<div style={{ padding: 12 }}><ShowNews oakAutoUnmount={true} news={record.content.news_item.filter((ele: any, index2: number) => index === index2)} /></div>}
                                                placement='right'
                                            >
                                                <div className={Style.selectItem} onClick={() => {
                                                    selectRef.current.blur();
                                                    setUrl(ele.url);
                                                    setSelectedRowKeys([record.article_id]);
                                                }}>
                                                    {ele.url}
                                                </div>
                                            </Popover>
                                        ))
                                    }
                                </div>}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div>{record.content.news_item[0].url}</div>
                        </div>
                    );
                }

            }
        },
        {
            dataIndex: 'update_time',
            title: '更新时间',
            render: (value, record, index) => {
                return <>{dayjs(value).format('YYYY-MM-DD HH:mm')}</>
            }
        },
        {
            dataIndex: 'op',
            title: '操作',
            render: (value, record, index) => {
                return <Popover
                    content={<div style={{ padding: 12 }}><ShowNews oakAutoUnmount={true} news={record.content.news_item} /></div>}
                >
                    <div style={{ cursor: 'pointer', color: '#1677ff' }}>预览</div>
                </Popover>
            }
        }
    ];
    return (
        <div className={Style.container}>
            <div className={Style.list}>
                <Table
                    dataSource={materials}
                    columns={columns}
                    rowKey="article_id"
                    pagination={{
                        total: total,
                        pageSize: 10,
                        current: currentPage,
                        onChange: (page: number, pageSize: number) => {
                            setCurrentPage(page);
                            getArticleList(page);
                        },
                    }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: selectedRowKeys,
                        onSelect: (record) => {
                            if(record.content.news_item.length > 1) {
                                return;
                            } else {
                                setUrl(record.content.news_item[0].url);
                            } 
                        },
                        onChange: (selectedRowKeys: any[]) => {
                            setSelectedRowKeys(selectedRowKeys)
                        }
                    }}
                />
            </div>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={!url!!} type={'primary'} onClick={() => {
                    getUrl(url);
                    setUrl('');
                    changeOpen(false);
                }}>确定</Button>
                <Button onClick={() => {
                    setUrl('');
                    changeOpen(false);
                }}>取消</Button>
            </Space>
        </div >
    );
}

