import React from 'react';
import { Tabs, Row, Col, Card, Divider, Input, Form, Space } from 'antd';
import Styles from './web.module.less';
function TencentAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return (<Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                腾讯云配置
            </Divider>
            <Tabs tabPosition={'top'} size={'middle'} type="editable-card" hideAdd={!(accounts.length > 0)} onEdit={(targetKey, action) => {
            if (action === 'add') {
                addItem('', accounts.length);
            }
            else {
                removeItem('', parseInt(targetKey, 10));
            }
        }} items={accounts.length > 0
            ? accounts.map((ele, idx) => ({
                key: `${idx}`,
                label: `帐号${idx + 1}`,
                children: (<Form colon={false} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                    <Form.Item label="secretId">
                                        <>
                                            <Input placeholder="请输入secretId" type="text" value={ele.secretId} onChange={(e) => setValue(`${idx}.secretId`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="secretKey">
                                        <>
                                            <Input placeholder="请输入secretKey" type="text" value={ele.secretKey} onChange={(e) => setValue(`${idx}.secretKey`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="region">
                                        <>
                                            <Input placeholder="请输入region" type="text" value={ele.region} onChange={(e) => setValue(`${idx}.region`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="endpoint" 
                // name="endpoint"
                tooltip="访问的域名，如：tencentcloudapi.com">
                                        <>
                                            <Input placeholder="请输入endpoint" type="text" value={ele.endpoint} onChange={(e) => setValue(`${idx}.endpoint`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="短信endpoint" 
                //name="smsEndpoint"
                tooltip="访问的域名，如：sms.tencentcloudapi.com">
                                        <>
                                            <Input placeholder="请输入endpoint" type="text" value={ele.smsEndpoint} onChange={(e) => setValue(`${idx}.smsEndpoint`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                </Form>),
            }))
            : [
                {
                    label: '新建帐号',
                    key: '0',
                    children: (<Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                        <Form.Item label="secretId">
                                            <>
                                                <Input placeholder="请输入secretId" type="text" value="" onChange={(e) => setValue(`0.secretId`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="secretKey">
                                            <>
                                                <Input placeholder="请输入secretKey" type="text" value="" onChange={(e) => setValue(`0.secretKey`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="region" 
                    // name="region"
                    tooltip="地域, 华北地区(北京): ap-beijing、 华南地区(广州): ap-guangzhou、华东地区(南京): ap-nanjing">
                                            <>
                                                <Input placeholder="请输入region" type="text" value="" onChange={(e) => setValue(`0.region`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="短信endpoint" 
                    // name="smsEndpoint"
                    tooltip="访问的域名，如：sms.tencentcloudapi.com">
                                            <>
                                                <Input placeholder="请输入endpoint" type="text" value="" onChange={(e) => setValue(`0.smsEndpoint`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                    </Form>),
                },
            ]}></Tabs>
        </Col>);
}
function QiniuAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return (<Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                七牛云配置
            </Divider>
            <Tabs tabPosition={'top'} size={'middle'} type="editable-card" hideAdd={!(accounts.length > 0)} onEdit={(targetKey, action) => {
            if (action === 'add') {
                addItem('', accounts.length);
            }
            else {
                removeItem('', parseInt(targetKey, 10));
            }
        }} items={accounts.length > 0
            ? accounts.map((ele, idx) => ({
                key: `${idx}`,
                label: `帐号${idx + 1}`,
                children: (<Form colon={false} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                    <Form.Item label="accessKey">
                                        <>
                                            <Input placeholder="请输入accessKey" type="text" value={ele.accessKey} onChange={(e) => setValue(`${idx}.accessKey`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="secretKey">
                                        <>
                                            <Input placeholder="请输入secretKey" type="text" value={ele.secretKey} onChange={(e) => setValue(`${idx}.secretKey`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                </Form>),
            }))
            : [
                {
                    label: '新建帐号',
                    key: '0',
                    children: (<Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                        <Form.Item label="accessKey">
                                            <>
                                                <Input placeholder="请输入accessKey" type="text" value="" onChange={(e) => setValue(`0.accessKey`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="secretKey">
                                            <>
                                                <Input placeholder="请输入secretKey" type="text" value="" onChange={(e) => setValue(`0.secretKey`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                    </Form>),
                },
            ]}></Tabs>
        </Col>);
}
function CTYunAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return (<Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                天翼云配置
            </Divider>
            <Tabs tabPosition={'top'} size={'middle'} type="editable-card" hideAdd={!(accounts.length > 0)} onEdit={(targetKey, action) => {
            if (action === 'add') {
                addItem('', accounts.length);
            }
            else {
                removeItem('', parseInt(targetKey, 10));
            }
        }} items={accounts.length > 0
            ? accounts.map((ele, idx) => ({
                key: `${idx}`,
                label: `帐号${idx + 1}`,
                children: (<Form colon={false} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                      <Form.Item label="accessKey">
                                          <>
                                              <Input placeholder="请输入accessKey" type="text" value={ele.accessKey} onChange={(e) => setValue(`${idx}.accessKey`, e.target.value)}/>
                                          </>
                                      </Form.Item>
                                      <Form.Item label="securityKey">
                                          <>
                                              <Input placeholder="请输入securityKey" type="text" value={ele.securityKey} onChange={(e) => setValue(`${idx}.securityKey`, e.target.value)}/>
                                          </>
                                      </Form.Item>
                                  </Form>),
            }))
            : [
                {
                    label: '新建帐号',
                    key: '0',
                    children: (<Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                          <Form.Item label="accessKey">
                                              <>
                                                  <Input placeholder="请输入accessKey" type="text" value="" onChange={(e) => setValue(`0.accessKey`, e.target.value)}/>
                                              </>
                                          </Form.Item>
                                          <Form.Item label="securityKey">
                                              <>
                                                  <Input placeholder="请输入securityKey" type="text" value="" onChange={(e) => setValue(`0.securityKey`, e.target.value)}/>
                                              </>
                                          </Form.Item>
                                      </Form>),
                },
            ]}></Tabs>
        </Col>);
}
function AliAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return (<Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                阿里云配置
            </Divider>
            <Tabs tabPosition={'top'} size={'middle'} type="editable-card" hideAdd={!(accounts.length > 0)} onEdit={(targetKey, action) => {
            if (action === 'add') {
                addItem('', accounts.length);
            }
            else {
                removeItem('', parseInt(targetKey, 10));
            }
        }} items={accounts.length > 0
            ? accounts.map((ele, idx) => ({
                key: `${idx}`,
                label: `帐号${idx + 1}`,
                children: (<Form colon={false} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                    <Form.Item label="accessKeyId">
                                        <>
                                            <Input placeholder="请输入accessKeyId" type="text" value={ele.accessKeyId} onChange={(e) => setValue(`${idx}.accessKeyId`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="accessKeySecret">
                                        <>
                                            <Input placeholder="请输入accessKeySecret" type="text" value={ele.accessKeySecret} onChange={(e) => setValue(`${idx}.accessKeySecret`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="regionId">
                                        <>
                                            <Input placeholder="请输入regionId" type="text" value={ele.regionId} onChange={(e) => setValue(`${idx}.regionId`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="endpoint" 
                //name="endpoint"
                tooltip="访问的域名，如：dysmsapi.aliyuncs.com">
                                        <>
                                            <Input placeholder="请输入endpoint" type="text" value={ele.endpoint} onChange={(e) => setValue(`${idx}.endpoint`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="apiVersion">
                                        <>
                                            <Input placeholder="请输入apiVersion" type="text" value={ele.apiVersion} onChange={(e) => setValue(`${idx}.apiVersion`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                    <Form.Item label="短信endpoint" 
                //name="smsEndpoint"
                tooltip="访问的域名，如：dysmsapi.aliyuncs.com">
                                        <>
                                            <Input placeholder="请输入endpoint" type="text" value={ele.smsEndpoint} onChange={(e) => setValue(`${idx}.smsEndpoint`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                </Form>),
            }))
            : [
                {
                    label: '新建帐号',
                    key: '0',
                    children: (<Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                        <Form.Item label="accessKeyId">
                                            <>
                                                <Input placeholder="请输入accessKeyId" type="text" value="" onChange={(e) => setValue(`0.accessKeyId`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="accessKeySecret">
                                            <>
                                                <Input placeholder="请输入accessKeySecret" type="text" value="" onChange={(e) => setValue(`0.accessKeySecret`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="regionId">
                                            <>
                                                <Input placeholder="请输入regionId" type="text" value="" onChange={(e) => setValue(`0.regionId`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="endpoint" 
                    // name="endpoint"
                    tooltip="访问的域名，如：dysmsapi.aliyuncs.com">
                                            <>
                                                <Input placeholder="请输入endpoint" type="text" value="" onChange={(e) => setValue(`0.endpoint`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="apiVersion">
                                            <>
                                                <Input placeholder="请输入apiVersion" type="text" value="" onChange={(e) => setValue(`0.apiVersion`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                        <Form.Item label="短信endpoint" 
                    //name="smsEndpoint"
                    tooltip="访问的域名，如：dysmsapi.aliyuncs.com">
                                            <>
                                                <Input placeholder="请输入endpoint" type="text" value="" onChange={(e) => setValue(`0.smsEndpoint`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                    </Form>),
                },
            ]}></Tabs>
        </Col>);
}
function AmapAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return (<Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                高德云配置
            </Divider>
            <Tabs tabPosition="top" size="middle" type="editable-card" hideAdd={!(accounts.length > 0)} onEdit={(targetKey, action) => {
            if (action === 'add') {
                addItem('', accounts.length);
            }
            else {
                removeItem('', parseInt(targetKey, 10));
            }
        }} items={accounts.length > 0
            ? accounts.map((ele, idx) => ({
                key: `${idx}`,
                label: `帐号${idx + 1}`,
                children: (<Form colon={false} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                    <Form.Item label="webApiKey">
                                        <>
                                            <Input placeholder="请输入webApiKey" type="text" value={ele.webApiKey} onChange={(e) => setValue(`${idx}.webApiKey`, e.target.value)}/>
                                        </>
                                    </Form.Item>
                                </Form>),
            }))
            : [
                {
                    label: '新建帐号',
                    key: '0',
                    children: (<Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                                        <Form.Item label="webApiKey">
                                            <>
                                                <Input placeholder="请输入webApiKey" type="text" value="" onChange={(e) => setValue(`0.webApiKey`, e.target.value)}/>
                                            </>
                                        </Form.Item>
                                    </Form>),
                },
            ]}></Tabs>
        </Col>);
}
export default function Account(props) {
    const { account, setValue, removeItem } = props;
    const { tencent, qiniu, ali, amap, ctyun } = account;
    return (<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种云厂商均可配置多个帐号，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <TencentAccount accounts={tencent || []} setValue={(path, value) => setValue(`tencent.${path}`, value)} removeItem={(path, index) => removeItem(`tencent`, index)} addItem={(path, index) => setValue(`tencent.${index}`, {})}/>
            <QiniuAccount accounts={qiniu || []} setValue={(path, value) => setValue(`qiniu.${path}`, value)} removeItem={(path, index) => removeItem(`qiniu`, index)} addItem={(path, index) => setValue(`qiniu.${index}`, {})}/>
            <CTYunAccount accounts={ctyun || []} setValue={(path, value) => setValue(`ctyun.${path}`, value)} removeItem={(path, index) => removeItem(`ctyun`, index)} addItem={(path, index) => setValue(`ctyun.${index}`, {})}/>
            <AliAccount accounts={ali || []} setValue={(path, value) => setValue(`ali.${path}`, value)} removeItem={(path, index) => removeItem(`ali`, index)} addItem={(path, index) => setValue(`ali.${index}`, {})}/>
            <AmapAccount accounts={amap || []} setValue={(path, value) => setValue(`amap.${path}`, value)} removeItem={(path, index) => removeItem(`amap`, index)} addItem={(path, index) => setValue(`amap.${index}`, {})}/>
        </Space>);
}
