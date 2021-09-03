import React, {useState} from 'react'
import { Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";

function LoginView() {
    const history = useHistory();
    const [isLoading, setLoading] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const toRegistrationView = () => {
        history.push('/register')
    }
    const loginToAccount = async () => {
        setLoading(true);
        try {
            const rawResponse = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const response = await rawResponse.json();
            if (response.accessToken) {
                history.push('/dashboard')
            }
            if (response.message) {
                message.info(response.message)
            }
            setLoading(false)
        } catch (error) {
            console.error('error', error)
        }
    }
    return (
        <div className="login-form">
            <Input size="large" onChange={(event) => setUsername(event.target.value)}  placeholder="Username" style={{ marginBottom: '0.5rem'}}/>
            <Input.Password size="large" onChange={(event) => setPassword(event.target.value)}  placeholder="Password" style={{ marginBottom: '0.5rem' }} />
            <Button loading={isLoading} onClick={loginToAccount} size="large" block type="primary" style={{ marginBottom: '0.5rem' }}>
                Login
            </Button>
            <p onClick={toRegistrationView}>register new account</p>
        </div>
    )
}

export default LoginView
