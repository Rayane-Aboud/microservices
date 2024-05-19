import { FaPen } from "react-icons/fa";
import Modal from "./Modal";
import EditForm from "../forms/EditForm";
import { Asset } from "../../helpers/types";

interface EditModalProps{
    openEdit : boolean;
    setOpenEdit: (openEdit:boolean)=>void;
    editEntry: (assets:any,name:string,newName:string)=>void;
    assets:any;
    entry:Asset;
}


export default function EditModal(props:EditModalProps){

    return (
        <>
        <button className="btn btn-primary" onClick={()=> props.setOpenEdit(true)}>
            <FaPen />
        </button>
        <Modal open={props.openEdit} onClose={()=>{props.setOpenEdit(false)}}>
            <div className="text-center w-56">
                <FaPen size={56} className="mx-auto text-blue-500"/>
                <div className="mx-auto my-4 w-48">
                    {/**-----------------form for editing----------*/}
                    <EditForm editEntry={props.editEntry} assets={props.assets} entry={props.entry}/>
                    {/**--------------------------------------------*/}
                </div>
                <div className="flex gap-4">
                    <button className="btn btn-primary w-full">Edit</button>
                    <button 
                        className="btn btn-light w-full" 
                        onClick={()=>props.setOpenEdit(false)}
                    >Cancel</button>
                </div>
            </div>
        </Modal>
        </>
    );
}