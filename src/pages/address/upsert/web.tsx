import React from 'react';
import { Button, Input, Textarea } from 'tdesign-mobile-react';

export default function render(this: any) {
    return (
        <div>
            <Input
                required={true}
                label="姓名"
                placeholder="姓名"
                onChange={this.setValue} 
                value={this.state.name}
                data-attr="name"
            />
            <Input
                required={true}
                label="手机号"
                placeholder="手机号"
                onChange={this.setValue}
                value={this.state.phone}
                data-attr="phone"
            />
            <Input
                required={true}
                label="所在地区"
                placeholder="所在地区"
                onChange={this.setValue}
                value={this.state.areaText}
                data-attr="areaText"
            />
            <Textarea
                label="详细地址"
                maxlength={100}
                value={this.state.detail}
                data-attr="detail"
                placeholder="详细地址"
            />

            <Button
                block
                theme="primary"
                onClick={() => {
                    this.confirm();
                }}
            >
                确定
            </Button>
        </div>
    );
}
