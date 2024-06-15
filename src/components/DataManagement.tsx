import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import useImporter from "../hooks/useImporter";

const DataManagement = () => {
  const [indexValue, setIndexValue] = useState("");
  const [content, setContent] = useState("");
  const handleChange = (event: any) => setIndexValue(event.target.value);
  const [triggerImport, setTriggerImport] = useState(false);
  const [isLoading, response, error] = useImporter(
    "/importer",
    indexValue,
    triggerImport ? content : ""
  );
  const handleImport = () => {
    setTriggerImport(true);
  };

  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: ".csv",
  });
  useEffect(() => {
    if (filesContent.length > 0) {
      filesContent.map((file, index) => setContent(file.content));
    }
  }, [filesContent]);
  return (
    <>
      <Input
        placeholder="Mention the index you want to import to"
        size="lg"
        width={800}
        value={indexValue}
        onChange={handleChange}
        mr={50}
      />
      <Button colorScheme="teal" size="lg" onClick={() => openFilePicker()}>
        Select file
      </Button>

      <Button
        ml={30}
        colorScheme="teal"
        size="lg"
        onClick={handleImport}
        disabled={!indexValue || !content}
      >
        {isLoading ? <Spinner /> : "Import"}
      </Button>

      {filesContent.map((file, index) => (
        <Box key={index} mt={4}>
          <Text>File Name: {file.name}</Text>
        </Box>
      ))}
      {response && (
        <Alert status="success">
          <AlertIcon />
          Import successful: {JSON.stringify(response)}
        </Alert>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Error: {error.valueOf()}
        </Alert>
      )}
    </>
  );
};

export default DataManagement;
