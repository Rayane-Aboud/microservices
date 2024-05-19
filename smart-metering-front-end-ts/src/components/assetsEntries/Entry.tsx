import { useState } from "react";
import { Asset } from "../../helpers/types";
import { DeleteModal } from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import AddModal from "../modals/AddModal";
import './entry.module.css'


interface EntryProps {
    entry: Asset; //add stuff to assets propoerties and pass it to next children
    depth: number;
    editEntry:(assetTree:any,name:string,newName:string)=>void;
    deleteEntry: (assetsTree:any,name:string)=>void;
    addChildToEntry: (assetsTree:any,targetName:string, childToAdd:Object)=>void;
    assets:any
}

//deleteEntry={deleteEntry} addChildToEntry={addChildToEntry}
  

export default function Entry(props:EntryProps){
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const childrenArray = Array.isArray(props.entry.children) ? props.entry.children : [];
    if (props.entry.name==="root"){
        return <div className="flex-col space-y-5 text-lg">
        <div  style={{
            display:'flex',
            justifyContent:'space-between',
        }}>
                <div>
                    <button onClick={()=>{console.log(props.entry.name);setIsExpanded(!isExpanded)}}>
                        {childrenArray.length !== 0 && (isExpanded ?'- ' : '+ ')}
                        {props.entry.name}
                    </button>
                </div>
                <div>
                    <AddModal openAdd={openAdd} setOpenAdd={setOpenAdd} addChildToEntry={props.addChildToEntry} assets={props.assets} entry={props.entry}/>
                </div>
        </div>
        {
            isExpanded &&
            <div style={{paddingLeft:`${props.depth*50}px`}} className="flex-col space-y-5">
                {childrenArray.map((entry)=>{
                    return <Entry key={entry.name} entry={entry} depth={props.depth + 1} editEntry={props.editEntry} deleteEntry={props.deleteEntry} addChildToEntry={props.addChildToEntry} assets={props.assets} />
                })}
            </div>
        }
    </div>;
    }
    else {

        return <div className="flex-col space-y-5 text-lg">
        <div  style={{
            display:'flex',
            justifyContent:'space-between',
        }}>
                <div>
                    <button onClick={()=>{console.log(props.entry.name);setIsExpanded(!isExpanded)}}>
                        {childrenArray.length !== 0 && (isExpanded ?'- ' : '+ ')}
                        {props.entry.name}
                    </button>
                </div>
                <div>
                    <DeleteModal openDelete={openDelete} setOpenDelete={setOpenDelete} deleteEntry={props.deleteEntry} assets={props.assets} entry={props.entry} />
                    <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} editEntry={props.editEntry} assets={props.assets} entry={props.entry}/>
                    <AddModal openAdd={openAdd} setOpenAdd={setOpenAdd} addChildToEntry={props.addChildToEntry} assets={props.assets} entry={props.entry}/>
                </div>
        </div>
        {
            isExpanded &&
            <div style={{paddingLeft:`${props.depth*50}px`}} className="flex-col space-y-5">
                {childrenArray.map((entry)=>{
                    return <Entry key={entry.name} entry={entry} depth={props.depth + 1} editEntry={props.editEntry} deleteEntry={props.deleteEntry} addChildToEntry={props.addChildToEntry} assets={props.assets} />
                })}
            </div>
        }
    </div>;

    }
    
}