import { Checkbox, Button, Tabs, Space } from 'antd';
import Style from './web.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { t, getStations, getSubways, setCheckedList, cancel, confirm } = methods;
    const { subways, stations, areaId, areas, stationIds, selectIds } = data;
    return (<div className={Style.container}>
            <Tabs style={{ minHeight: '40vh' }} tabPosition={'left'} type="card" defaultActiveKey={areaId} onChange={(value) => {
            getSubways(value);
        }} items={areas?.map((ele) => ({
            key: ele.id,
            label: ele.name,
            children: (<Tabs tabPosition={'top'} onChange={(value) => {
                    getStations(value);
                }} items={subways?.map((ele) => ({
                    key: ele.id,
                    label: ele.name,
                    children: (<Space size={[0, 16]} wrap>
                                        {stations?.map((ele) => {
                            return (<Checkbox disabled={selectIds?.includes(ele.value)} onChange={(e) => {
                                    setCheckedList(e.target.value, e.target.checked);
                                }} checked={stationIds
                                    .concat(selectIds || [])
                                    .includes(ele.value)} value={ele.value}>
                                                    {ele.label}
                                                </Checkbox>);
                        })}
                                    </Space>),
                }))}></Tabs>),
        }))}></Tabs>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Space>
                    <Button onClick={() => {
            cancel();
        }}>
                        取消
                    </Button>
                    <Button type="primary" onClick={async () => {
            confirm();
        }}>
                        确定
                    </Button>
                </Space>
            </div>
        </div>);
}
