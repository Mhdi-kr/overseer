import { Button, Card, Switch, Row, Col } from 'antd';
import { MoreOutlined } from '@ant-design/icons'
import { MqttClient } from 'mqtt';
import React from 'react';
import { useState, useEffect } from 'react';
type ToggleWidgetProps = {
    title: String,
    value?: boolean,
    client: MqttClient,
    modalCallBack: (dataObj: any) => void,
}
let ToggleWidget = ({ title, client, modalCallBack }: ToggleWidgetProps) => {
    let initialValue = null;
    let onChange = (checked: boolean) => {
        setLocalVals(checked);
        client.publish('topic/1', checked.toString(), { qos: 0, retain: true });
        return checked;
    }
    useEffect(() => {
        client.on('error', function (err) {
            client.end()
        })

        client.on('connect', function (obj) {
            client.subscribe('topic/1', { qos: 0 })
            // client.publish('topic', 'wss secure connection demo...!', { qos: 0, retain: false })
        })

        client.on('message', (topic, message, packet) => {
            if (topic === 'topic/1') {
                if (message.toString() === 'false') { setLocalVals(false) } else {
                    setLocalVals(true)
                }
            }

        })
        client.on('close', function () {
        })
    }, [client]);
    const [localVals, setLocalVals] = useState<boolean>(!!initialValue);
    const clickDots = () => {
        modalCallBack({ title: localVals.toString() });
    }
    let moreDots = (
        <Button shape="circle" onClick={clickDots} icon={<MoreOutlined rotate={90} />} />
    );
    return (
        <div>
            <Card>
                <Row justify="space-between">
                    <Col><span style={{ fontWeight: 500, fontSize: '16px'}}>{title}</span></Col>
                    <Col><Switch disabled={!!client} checked={localVals} onChange={(s) => onChange(s)} /></Col>
                </Row>
            </Card>
        </div>);
}

export default ToggleWidget;