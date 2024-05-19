import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form,Button } from "react-bootstrap";


export default function ProfileForm(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
    }

    return (
        <div style={{
            padding:"10px",
        }}>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" value={username} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" value={email} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" value={password} />
                </Form.Group>

                <Button variant="primary" >
                    change informations
                </Button>
            </Form>
        </div>
    );
}