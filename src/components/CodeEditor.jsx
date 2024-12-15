import React, { useState, useRef } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import Output from './Output'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from '../constants'

const CodeEditor = () => {
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript")
    const [value, setValue] = useState("")

    const onMount = (editor) => {
      editorRef.current = editor;
      editor.focus();
    };
  
    const onSelect = (language) => {
        setLanguage(language)
        setValue(CODE_SNIPPETS[language])
    }

  return (
    <Box>
        <HStack flexDirection={["column", "column", "row"]} 
        spacing={{ base: 28, lg: 4}}
        >
            <Box 
            w={{ base: "100%", md: "100%", lg: "50%" }}
            h={["40vh", "50vh", "75vh"]} 
            >
                <LanguageSelector language={language} onSelect={onSelect} />
                <Editor 
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                defaultValue={CODE_SNIPPETS[language]}
                language={language}
                theme="vs-dark"
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
                 />
           </Box>
           <Output editorRef={editorRef} language={language} />
        </HStack>
    </Box>
  )
}

export default CodeEditor
