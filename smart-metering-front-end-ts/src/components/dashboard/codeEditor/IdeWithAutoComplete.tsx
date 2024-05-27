import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-okaidia.css'

export default function IdeWithAutoComplete(){
  const [code, setCode] = useState(
    `def criterion():
      pass
    `
  );

  return (
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
  )

}