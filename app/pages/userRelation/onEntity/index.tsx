import React, { Component } from 'react';
import { Input, Card, Avatar } from 'antd';
const Search = Input.Search;
const Meta = Card.Meta;

export default function render() {
    const { rows } = this.state;

    return (
        <div>
            <Search
                placeholder="请输入"
                value={this.state.searchValue || ''}
                enterButton="搜索"
                size="middle"
                loading={this.state.oakLoading}
                onChange={this.searchChange}
                allowClear
                onSearch={(value, event) => {
                    // value清空
                    if (value) {
                        this.searchConfirm();
                    } else {
                        this.searchCancel();
                    }
                }}
            />
            {rows?.map((item, index) => {
                <Card key={index} onClick={this.handleCardClick}>
                    <Meta title={item.name} />
                </Card>;
            })}
        </div>
    );
}
