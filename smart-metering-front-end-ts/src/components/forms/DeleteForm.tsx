import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form,Button } from "react-bootstrap";
import { Asset } from "../../helpers/types";


interface DeleteFormModal{
    deleteEntry:(assetsTree:any,name:string)=>void;
    assets:any;
    entry:Asset;
}

export default function DeleteForm(props:DeleteFormModal){
    
    const [name, setName]=useState('');
    const submitChanges = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        props.deleteEntry(props.assets,props.entry.name);
    }
    return (
        <div style={{
            padding:"10px",
        }}>
            <Form onSubmit={submitChanges}>
                <Form.Group className="mb-3">
                    <Form.Label>name</Form.Label>
                    <Form.Control onChange={(e) => {setName(e.target.value)}} type="text" name="name" value={name} />
                </Form.Group>

                <Button type="submit" variant="primary" >
                    change informations
                </Button>
            </Form>
        </div>
    );
}