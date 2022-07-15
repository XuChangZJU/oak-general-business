import React, { Component } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function render() {
    const { type } = this.props;
    const { files } = this.state;
    return (
        <Upload
            accept={type}
            listType="picture-card"
            fileList={files || []}
            onChange={(event) => {}}
        >
            {files?.length >= 8 ? null : (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                </div>
            )}
        </Upload>
    );
}
