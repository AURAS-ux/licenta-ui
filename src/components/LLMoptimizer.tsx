import {
  Box,
  Button,
  Code,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLLM from "../hooks/useLLM";

const LLMoptimizer = () => {
  const [iters, setIters] = useState(1);
  const handleIterations = (event: any) => {
    setIters(event.target.value);
  };
  const [triggerLLM, setTriggerLLM] = useState(false);

  const [isLoading, response, error] = useLLM(
    "/optimizer/llm",
    triggerLLM,
    Number(iters)
  );

  const handleTriggerLLM = () => {
    setTriggerLLM(true);
  };

  useEffect(() => {
    setTriggerLLM(false);
  }, [response, error]);

  return (
    <>
      <HStack alignItems="flex-start">
        <Box width={400}>
          <Text>Iterations</Text>
          <Input
            name="iters"
            type="number"
            width={350}
            onChange={handleIterations}
            value={iters}
          />

          <Text mt={30}>LLM</Text>
          <Select width={350}>
            <option>GPT</option>
            <option>GeminiAI</option>
          </Select>

          <Button colorScheme="teal" onClick={handleTriggerLLM} mt={30}>
            Run LLM optimization
          </Button>
        </Box>
        <Box>
          {isLoading ? (
            <Spinner size="xl" thickness="8px" speed="0.7s" />
          ) : null}

          {response != "" ? (
            <Code p={3} overflow="auto" whiteSpace="pre-wrap">
              {" "}
              {JSON.stringify(response)}{" "}
            </Code>
          ) : error != "" ? (
            <Code p={3} overflow="auto" whiteSpace="pre-wrap">
              {JSON.stringify(error)}{" "}
            </Code>
          ) : null}
        </Box>
      </HStack>
    </>
  );
};

export default LLMoptimizer;
