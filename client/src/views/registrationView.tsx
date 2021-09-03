import React, { useState } from 'react'
import { Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";

function RegistrationView() {
    const history = useHistory();
    const [isLoading, setLoading] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const toLoginView = () => {
        history.push('/login')
    }
    const registerNewAccount = async () => {
        setLoading(true);
        try {
            const rawResponse = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const content = await rawResponse.json();
            message.info(content.message)
            setLoading(false)
        } catch (error) {
            console.error('error', error)
        }
    }
    return (
        <div className="login-form">
            <Input size="large" onChange={(event) => setUsername(event.target.value)} placeholder="Username" style={{ marginBottom: '0.5rem' }} />
            <Input size="large" onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ marginBottom: '0.5rem' }} />
            <Input.Password onChange={(event) => setPassword(event.target.value)} size="large" placeholder="Password" style={{ marginBottom: '0.5rem' }} />
            <Button loading={isLoading} onClick={registerNewAccount} size="large" block type="primary" style={{ marginBottom: '0.5rem' }}>
                Sign up
            </Button>
            <p onClick={toLoginView}>already have an account</p>
        </div>
    )
}

export default RegistrationView
