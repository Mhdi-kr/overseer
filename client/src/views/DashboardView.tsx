import React, { useState } from 'react';
import { Modal, Card, Button, Avatar, Badge } from 'antd';
import mqtt from 'mqtt';
import ToggleWidget from '../components/widgets/ToggleWidget';
import SliderWidget from '../components/widgets/SliderWidget';
import { PlusOutlined, UserOutlined } from '@ant-design/icons'

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'ws://192.168.1.102:8080'
const options = {
    keepalive: 30,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false
}
var client = mqtt.connect(host, options)

function DashboardView() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<{ title?: String }>({});
    let modalInternals = (
        <div>{modalData.title}</div>
    );
    const showModal = (dataObj: any) => {
        setModalData(dataObj);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Card style={{ marginTop: '1rem'}}>
                <div className="toolbar">
                    <span className="avatar-item">
                        <Badge count={1}>
                            <Avatar shape="circle" icon={<UserOutlined />} />
                        </Badge>
                    </span>
                    <Button className="toolbar__add-widget-btn" icon={<PlusOutlined />} type="primary" shape="round">Add widget</Button>
                </div>
            </Card>
            <ToggleWidget title="LED built-in" client={client} modalCallBack={showModal} />
            <SliderWidget title="Temperature" client={client} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {modalInternals}
            </Modal>
        </>
    );
}

export default DashboardView
