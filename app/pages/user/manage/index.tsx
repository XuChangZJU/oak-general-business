import * as React from 'react';
import { Input, Tooltip, Button } from 'antd';
const { Search } = Input;

import UserCell from '../../../components/user/cell';

export default function render() {
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

            {this.state.userData?.map((ele, index) => {
                return (
                    <UserCell
                        key={index}
                        oak:path={index.toString()}
                        oakId={ele.id}
                        click={() => this.onCellClicked()}
                    />
                );
            })}

            <Tooltip title="创建">
                <Button
                    className="add-btn"
                    type="primary"
                    shape="circle"
                    size="large"
                    onClick={(event) => {
                        this.goNewUser();
                    }}
                >
                    +
                </Button>
            </Tooltip>
        </div>
    );
}