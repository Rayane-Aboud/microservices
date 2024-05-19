import { IoIosAdd } from "react-icons/io";
import Modal from "./Modal";
import AddForm from "../forms/AddForm";
import { Asset } from "../../helpers/types";


interface AddModalProps{
    openAdd : boolean;
    setOpenAdd: (openAdd:boolean)=>void;
    addChildToEntry:(assetsTree:any,targetName:string, childToAdd:Object)=>void;
    assets:any;
    entry:Asset;
    
}


export default function AddModal(props:AddModalProps){
    return <>
    <button className="btn btn-success" onClick={()=> props.setOpenAdd(true)}>
        <IoIosAdd />
    </button>
    <Modal open={props.openAdd} onClose={()=>{props.setOpenAdd(false)}}>
        <div className="text-center w-56">
            <IoIosAdd size={56} className="mx-auto text-green-500"/>
            <div className="mx-auto my-4 w-48">
                {/**-----------------form for editing----------*/}
                <AddForm addEntry={props.addChildToEntry} assets={props.assets} entry={props.entry}/>
                {/**--------------------------------------------*/}
            </div>
            <div className="flex gap-4">
                <button className="btn btn-success w-full">Edit</button>
                    <button 
                    className="btn btn-light w-full" 
                    onClick={()=>props.setOpenAdd(false)}
                >Cancel</button>
            </div>
        </div>
    </Modal>
    </>
}