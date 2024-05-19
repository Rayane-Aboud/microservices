import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form,Button } from "react-bootstrap";
import { Asset } from "../../helpers/types";


interface EditFormModal{
    editEntry:(assets:any,name:string,newName:string)=>void;
    assets:any
    entry:Asset;
}


export default function EditForm(props:EditFormModal){
    const submitChanges = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        props.editEntry(props.assets,props.entry.name,name);
    }

    const [name, setName]=useState('');
    return (
        <div style={{
            padding:"10px",
        }}>
            <Form onSubmit={submitChanges}>
                <Form.Group className="mb-3">
                    <Form.Label>name</Form.Label>
                    <Form.Control onChange={(e) => {setName(e.target.value)}} type="text" name="username" value={name} />
                </Form.Group>

                <Button type="submit" variant="primary" >
                    change informations
                </Button>
            </Form>
        </div>
    );
}

