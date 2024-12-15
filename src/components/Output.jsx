import React, {useState} from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { executeCode } from '../api.js'

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box 
    w={["100%", "100%", "50%"]}
    h={["60vh", "60vh", "75vh"]} 
    marginBottom={{ base: 24, lg: 0}}
    >
        <Text mb={2} fontSize="lg">Output</Text>
        <Button 
        colorScheme='teal' 
        mb={4}
        variant="outline"
        isLoading={isLoading}
        onClick={runCode}
        >
            Run Code
        </Button>
        <Box
        height={["60vh", "60vh", "75vh"]}  
         p={2}
         color={isError ? "red.400" : ""}
         border="1px solid"
         borderRadius={4}
         borderColor={isError ? "red.500" : "#333"}
         >
        {output
          ? (
            output.slice(0, isError ? 7 : output.length)
                  .map((line, i) => <Text key={i}>{line}</Text>)
          )
          : 'Click "Run Code" to see the output here'}

        </Box>
    </Box>
  )
}

export default Output
