import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form,Button } from "react-bootstrap";
import { Asset } from "../../helpers/types";

interface AddFormModal{
    addEntry:(assetsTree:any,targetName:string, childToAdd:Object)=>void;
    assets:any;
    entry:Asset;
}


export default function AddForm(props:AddFormModal){
    
    const [name, setName]=useState('');
    const submitAdd = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();

        props.addEntry(props.assets,props.entry.name,{name:name,children:[]});
    }
    return (
        <div style={{
            padding:"10px",
        }}>
            <Form onSubmit={submitAdd}>
                <Form.Group className="mb-3">
                    <Form.Label>name</Form.Label>
                    <Form.Control onChange={(e) => {setName(e.target.value)}} type="text" name="username" value={name} />
                </Form.Group>

                <Button type="submit" variant="primary" >
                    Add Entry
                </Button>
            </Form>
        </div>
    );
}