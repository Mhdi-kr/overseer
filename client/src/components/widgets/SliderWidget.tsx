import { Slider, Card } from 'antd';
import { MqttClient } from 'mqtt';
import React from 'react';
import { useEffect, useState } from 'react';
type ToggleWidgetProps = {
    title: String,
    value?: Number,
    client: MqttClient,
}
let SliderWidget = ({ title, client }: ToggleWidgetProps) => {
    let initial: number = 0;
    const [localVal, setLocalVal] = useState<number>(initial);
    const change = (newValue: number) => {
        setLocalVal(newValue);
        client.publish('topic/2', newValue.toString(), { qos: 0, retain: true });
    }
    useEffect(() => {
        client.on('error', function (err) {
            client.end()
        })

        client.on('connect', function (obj) {
            client.subscribe('topic/2', { qos: 0 })
            // client.publish('topic', 'wss secure connection demo...!', { qos: 0, retain: false })
        })

        client.on('message', (topic, message, packet) => {
            if (topic === 'topic/2') {
                setLocalVal(parseInt(message.toString()));
            }
        })
        client.on('close', function () {
        })
    }, [client]);
    return (
        <div>
            <Card title={title}>
                <Slider value={localVal} onChange={(s)=>change(s)} />
            </Card>
        </div>);
}

export default SliderWidget;