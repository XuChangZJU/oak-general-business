import React from "react";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
import MyInfo from '../../components/my/info';
import Styles from './web.pc.module.less';

export default function Render() {
    return (
        <Layout>
            <Layout>
                <Sider>
                    <MyInfo />
                </Sider>
                <Content className={Styles.content}>
                    根据业务定制（请将这个页面的逻辑复制到project下处理）
                </Content>
            </Layout>
        </Layout>
    )
}