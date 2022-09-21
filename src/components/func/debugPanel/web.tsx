import React from 'react';
import { Button, Space, Drawer, DialogPlugin } from 'tdesign-react';
import { ChevronUpIcon } from 'tdesign-icons-react';
// import { saveAs } from 'file-saver';

export default function render(this: any) {
    const { placement = 'bottom', style = {} } = this.props;
    const { visible } = this.state;
    return (
        <React.Fragment>
            <Button
                variant="text"
                shape="circle"
                theme="primary"
                icon={<ChevronUpIcon />}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: '45vw',
                    ...style,
                }}
                onClick={() => {
                    this.setVisible(true);
                }}
            />

            <Drawer
                placement={placement}
                visible={visible}
                onClose={() => {
                    this.setVisible(false);
                }}
                header="Debug控制台"
                footer={<></>}
            >
                <input 
                    type="file"
                    accept='application/json'
                    hidden
                    id="upload"
                    onChange={()=>{
                        const that = this;
                        const file = (document.getElementById('upload') as any).files[0];
                        if (typeof FileReader === undefined) {
                            alert('浏览器版本太老了');
                        }
                        else {
                            const reader = new FileReader();
                            reader.readAsText(file);
                            reader.onload = function() {
                                try {
                                    const data = JSON.parse(this.result as string);
                                    that.features.localStorage.resetAll(data);
                                    window.location.reload();
                                }
                                catch(err) {
                                    console.error(err);
                                }
                            }
                        }
                    }}
                />
                <Space breakLine={true} direction="horizontal" size="medium">
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printRunningTree()}
                    >
                        R
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printDebugStore()}
                    >
                        S
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printCachedStore()}
                    >
                        C
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => {
                            const data = this.features.localStorage.loadAll();
                            const element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
                            element.setAttribute('download', 'data.json');
                          
                            element.style.display = 'none';
                            document.body.appendChild(element);
                          
                            element.click();
                          
                            document.body.removeChild(element);
                        }}
                    >
                        D
                    </Button>

                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => {
                            const element = document.getElementById('upload');
                            element!.click();
                        }}
                    >
                        U
                    </Button>
                    <Button
                        theme="warning"
                        shape="circle"
                        onClick={() => {
                            const confirmDia = DialogPlugin.confirm!({
                                header: '重置数据',
                                body: '重置后，原来的数据不可恢复',
                                confirmBtn: '确定',
                                cancelBtn: '取消',
                                onConfirm: ({ e }) => {
                                    this.resetInitialData();
                                    confirmDia.hide!();
                                    window.location.reload();
                                },
                                onClose: ({ e, trigger }) => {
                                    confirmDia.hide!();
                                },
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </Drawer>
        </React.Fragment>
    );
}