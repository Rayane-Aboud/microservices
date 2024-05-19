import { FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import DeleteForm from "../forms/DeleteForm";
import { Asset } from "../../helpers/types";


interface DeleteModalProps{
    openDelete : boolean;
    setOpenDelete: (openDelete:boolean)=>void;
    deleteEntry:(assetsTree:any,name:string)=>void;
    assets:any
    entry:Asset;
}

export function DeleteModal(props:DeleteModalProps){
    return <>
        <button className="btn btn-danger" onClick={()=> props.setOpenDelete(true)}>
            <FaTrash />
        </button>
        <Modal open={props.openDelete} onClose={()=>{props.setOpenDelete(false)}}>
            <div className="text-center w-56">
                <FaTrash size={56} className="mx-auto text-red-500"/>
                <div className="mx-auto my-4 w-48">
                    <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                    <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item ?
                    </p>
                </div>
                {/**---------------------------------------------- */}
                <DeleteForm deleteEntry={props.deleteEntry} assets={props.assets} entry={props.entry}/>
                {/**----------------------------------------------*/}
                <div className="flex gap-4">
                    <button className="btn btn-danger w-full">Delete</button>
                    <button 
                        className="btn btn-light w-full" 
                        onClick={()=>props.setOpenDelete(false)}
                    >Cancel</button>
                </div>
            </div>
        </Modal>
    </>
}

{/**

serialNumber: randomId(),
    locationX: randomTraderName(),
    locationY: randomTraderName(),
    date: 25,
    dateType: randomCreatedDate(),
    dataType: randomRole(),
    dataUnit:randomRole(),
    value:55,


*/}