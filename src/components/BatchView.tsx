import { Button, Card, HStack, Input, VStack } from "@chakra-ui/react";
import useDataBatches from "../hooks/useDataBatches";
import { useState } from "react";
import DataCard from "./DataCard";

const BatchView = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  const { batches } = useDataBatches("/get_data/" + value, value);

  const llmOnClick = () => {
    console.log("DEBUG: Sending data to llm");
  };
  const kgOnClick = () => {
    console.log("DEBUG: Sending data to neo4j");
  };

  return (
    <>
      <VStack padding={10}>
        <Input
          placeholder="Enter the number of the desired batch of data"
          size="lg"
          value={value}
          onChange={handleChange}
        />
        <Card>
          {value && <DataCard batch={batches} />}
          {value && (
            <HStack justifyContent="space-between" padding={3}>
              <Button colorScheme="teal" width="45%" onClick={llmOnClick}>
                {" "}
                Send Data to LLM{" "}
              </Button>

              <Button colorScheme="teal" width="45%" onClick={kgOnClick}>
                {" "}
                Send Data to Neo4J{" "}
              </Button>
            </HStack>
          )}
        </Card>
      </VStack>
    </>
  );
};

export default BatchView;
