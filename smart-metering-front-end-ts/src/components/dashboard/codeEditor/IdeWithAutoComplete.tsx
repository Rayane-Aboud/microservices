import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-okaidia.css'
import axios from 'axios';


interface IdeWithAutoCompleteProps {
  codeSnippet?: string;
  serialNumber?: string;
}

export default function IdeWithAutoComplete({ codeSnippet, serialNumber }: IdeWithAutoCompleteProps){
  
  const [code, setCode] = useState(codeSnippet||"");
  console.log("Code snippet is ",codeSnippet);
  useEffect(() => {
    if (codeSnippet) {
      setCode(codeSnippet);
    }
  }, [codeSnippet]);


  const updateCodeSnippet = async () => {
    try {
      const response = await axios.patch(`http://localhost:9669/devices/${serialNumber}/code-snippet`, {
        codeSnippet: code
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating code snippet:', error);
    }
  };


  return (
    <>
      <button onClick={updateCodeSnippet}>Update</button>

      <Editor
        
        value={code}

        onValueChange={code => setCode(code)}

        highlight={code => Prism.highlight(code, Prism.languages.javascript, 'python')}

        padding={10}

        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          border:'1px solid black',
        }}
      />
    </>
  )

}