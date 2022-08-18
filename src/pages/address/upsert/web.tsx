import React from 'react';
import { Button, Input, Textarea } from 'tdesign-mobile-react';

export default function render() {
    return (
        <div>
            <Input
                required={true}
                label="姓名"
                placeholder="姓名"
                onChange={this.setValue}
                oak:value="name"
            />
            <Input
                required={true}
                label="手机号"
                placeholder="手机号"
                onChange={this.setValue}
                oak:value="phone"
            />
            <Input
                required={true}
                label="所在地区"
                placeholder="所在地区"
                onChange={this.setValue}
                oak:value="areaText"
            />
            <Textarea
                label="详细地址"
                maxlength={100}
                oak:value="detail"
                placeholder="详细地址"
            />

            <Button
                block
                theme="primary"
                onClick={(event) => {
                    this.confirm();
                }}
            >
                确定
            </Button>
        </div>
    );
}
