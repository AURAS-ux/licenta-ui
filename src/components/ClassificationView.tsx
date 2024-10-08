import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Code,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useClassifier from "../hooks/useClassifier";

const ClassificationView = () => {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const recomandation = [randomInt(0, 100), randomInt(30, 300)];
  const [index, setIndex] = useState("");
  const [layers, setLayers] = useState(0);
  const [unitsperlayer, setUnits] = useState(0);
  const [activation, setActivation] = useState("relu");
  const [input, setInput] = useState("");
  const [target, setTarget] = useState(10);
  const [triggerClassify, setClassify] = useState(false);
  const [recommand, setRecommand] = useState(false);

  const isValid = () => {
    return (
      index != "" &&
      layers != 0 &&
      unitsperlayer != 0 &&
      activation != "" &&
      input != "" &&
      target != 0
    );
  };

  const handleTriggerClassification = () => {
    setClassify(true);
  };

  const handleRecommand = () => {
    setRecommand(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "index":
        setIndex(value);
        break;
      case "layers":
        setLayers(Number(value));
        break;
      case "units":
        setUnits(Number(value));
        break;
      case "activation":
        setActivation(value);
        break;
      case "input":
        setInput(value);
        break;
      case "tag":
        setTarget(Number(value));
        break;
      default:
        break;
    }
  };

  const castToArray = (str: string) => {
    if (str != "") return JSON.parse(str);
  };

  const [isLoading, response, error] = useClassifier(
    "/classifier/results/" + index,
    triggerClassify,
    layers,
    unitsperlayer,
    activation,
    castToArray(input),
    target
  );

  return (
    <>
      {isValid() ? (
        <Alert status="success" width={350}>
          <AlertIcon />
          Data is valid
        </Alert>
      ) : (
        <Alert status="error" width={350}>
          <AlertIcon /> Error in data validation
        </Alert>
      )}
      <HStack alignItems="flex-start">
        <VStack alignItems="flex-start">
          <Box width={400}>
            <Text>Elastic storage name</Text>
            <Input
              name="index"
              width={350}
              value={index}
              onChange={handleChange}
            />

            <Text>Layers for classification</Text>
            <Input
              name="layers"
              type="number"
              backgroundColor={recommand ? "teal" : ""}
              width={350}
              value={!recommand ? layers : recomandation[0]}
              onChange={handleChange}
            />

            <Text>Number of units per layer</Text>
            <Input
              name="units"
              backgroundColor={recommand ? "teal" : ""}
              type="number"
              width={350}
              value={!recommand ? unitsperlayer : recomandation[1]}
              onChange={handleChange}
            />

            <Text>Activation function</Text>
            <Input
              name="activation"
              width={350}
              value={activation}
              onChange={handleChange}
            />

            <Text>Input for classification</Text>
            <Input
              name="input"
              width={350}
              value={input}
              onChange={handleChange}
            />

            <Text>Number of the classification tag</Text>
            <Input
              name="tag"
              type="number"
              width={350}
              value={target}
              onChange={handleChange}
            />
          </Box>

          <HStack>
            <Button
              colorScheme="teal"
              onClick={handleTriggerClassification}
              width={170}
              mt={30}
            >
              Classify data
            </Button>

            <Button
              colorScheme="teal"
              width={170}
              onClick={handleRecommand}
              mt={30}
            >
              Recommand values
            </Button>
          </HStack>
        </VStack>
        <Box>
          {isLoading ? (
            <Spinner size="xl" thickness="8px" speed="0.7s" />
          ) : null}

          {response != "" ? (
            <Code p={3} overflow="auto" whiteSpace="pre-wrap">
              {JSON.stringify(response)}
            </Code>
          ) : error != "" ? (
            <Code p={3} overflow="auto" whiteSpace="pre-wrap">
              {JSON.stringify(error)}
            </Code>
          ) : null}
        </Box>
      </HStack>
    </>
  );
};

export default ClassificationView;
