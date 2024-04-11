import { Button, Card, HStack, Input, VStack } from "@chakra-ui/react";
import useDataBatches from "../hooks/useDataBatches";
import { useState } from "react";
import DataCard from "./DataCard";

const BatchView = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  const { batches } = useDataBatches("/get_data/" + value, value);
  

  const llmOnClick = () => {
    
  }

  return (
    <>
      <VStack padding={10}>
        <Input
          placeItems="Enter the number of the desired batch of data"
          size="lg"
          value={value}
          onChange={handleChange}
        />
        <Card>
          {value && <DataCard batch={batches} />}
          <HStack justifyContent="space-between" padding={3}>
            {value && (
              <Button colorScheme="teal" width="45%">
                {" "}
                Send Data to LLM{" "}
              </Button>
            )}
            {value && (
              <Button colorScheme="teal" width="45%">
                {" "}
                Send Data to Neo4J{" "}
              </Button>
            )}
          </HStack>
        </Card>
      </VStack>
    </>
  );
};

export default BatchView;
