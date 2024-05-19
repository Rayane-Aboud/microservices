import { useEffect, useState } from "react"
import Entry from "../components/assetsEntries/Entry"
import { getAssets, updateAssetsTree } from "../api/assetsApi";


interface AssetsTree {
    name: string;
    children: AssetsTree[];
}
  


export default function AssetsPage(){

    const [assetsTree, setAssetsTree] = useState<AssetsTree>({name:"root",children:[]});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
          try {
            const data = await getAssets();
            setAssetsTree(data);
            console.log('the data is : ',data)
          } catch (error) {
            console.error('Error fetching users:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAssets();
      }, []);

    async function editEntry(assetsTree:any,name:string,newName:string){
        const newTree = Object.assign({},assetsTree);
        function renameNode(tree:any, oldName:string, newName:string) {
            // If the current node's name matches `oldName`, update it to `newName`
        if (tree.name === oldName) {
            tree.name = newName;
            return true; // Signal that renaming was successful
        }
        
        // If the node has children, recursively search each child
        if (tree.children) {
            for (let i = 0; i < tree.children.length; i++) {
                if (renameNode(tree.children[i], oldName, newName)) {
                    return true; // Exit early if renaming was successful
                }
            }
        }
        
        return false; // Signal that `oldName` was not found in the current subtree
        }
          

        
    
        renameNode(newTree , name,newName);
        try {
          const data = await updateAssetsTree(newTree);
          setAssetsTree(data);
          console.log('the data is : ',data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        
        setAssetsTree(newTree);
    }

    async function deleteEntry(assetsTree:any,name:string){
        const newTree = Object.assign({},assetsTree);
        function deleteNode(tree:any, nameToDelete:string) {
            if (!tree.children) {
                return false; // No children to search through
            }
            
            // Check each child to find the one to delete
            for (let i = 0; i < tree.children.length; i++) {
                const child = tree.children[i];
                
                if (child.name === nameToDelete) {
                // Remove the child from the `children` array
                tree.children.splice(i, 1);
                return true; // Node deleted successfully
                }
            
                // Recursively apply the deletion to each child
                if (deleteNode(child, nameToDelete)) {
                return true; // Exit early if deletion was successful
                }
            }
            
            return false; // The specified name was not found
        } 
        
        deleteNode(assetsTree,name);
        try {
          const data = await updateAssetsTree(newTree);
          setAssetsTree(data);
          console.log('the data is : ',data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        setAssetsTree(newTree);

    }
    

    async function addChildToEntry(assetsTree:any,targetName:string, childToAdd:Object){
        const newTree = Object.assign({},assetsTree);
        function addChildToNode(tree:any, targetName:string, childToAdd:Object) {
            // If the current node matches the target name, add the new child
            if (tree.name === targetName) {
              // Ensure the node has a children array to append to
              if (!tree.children) {
                tree.children = [];
              }
              tree.children.push(childToAdd);
              return true; // Indicate the addition was successful
            }
          
            // If the node has children, recursively apply the addition to each child
            if (tree.children) {
              for (let i = 0; i < tree.children.length; i++) {
                if (addChildToNode(tree.children[i], targetName, childToAdd)) {
                  return true; // Exit early if addition was successful
                }
              }
            }
          
            return false; // The specified target name was not found
          }
        addChildToNode(newTree,targetName,childToAdd);
        try {
          const data = await updateAssetsTree(newTree);
          setAssetsTree(data);
          console.log('the data is : ',data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        setAssetsTree(newTree);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    

    
    return <div className="assetsPage flex-col space-y-5 p-2">
        <Entry key={assetsTree.name} entry={assetsTree} depth={1} editEntry={editEntry} deleteEntry={deleteEntry} addChildToEntry={addChildToEntry} assets={assetsTree}/>
    </div>
}