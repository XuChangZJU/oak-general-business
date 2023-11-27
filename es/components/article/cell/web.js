import { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
const { confirm } = Modal;
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor } from "@wangeditor/editor-for-react";
import Style from './web.module.less';
export default function Render(props) {
    const { methods: method, data } = props;
    const { content, oakId, width } = props.data;
    const { t } = method;
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    const [value, setValue] = useState('');
    useEffect(() => {
        if (content) {
            setValue(content);
        }
    }, [content]);
    return (<div className={Style.container}>
            <Row>
                <Col xs={24} sm={16}>
                    {content && (<Editor defaultConfig={editorConfig} value={content ? content : value} mode="default" style={{
                width: width === 'xs' ? '100vw' : '900px',
            }}/>)}

                </Col>
            </Row>
        </div>);
}
