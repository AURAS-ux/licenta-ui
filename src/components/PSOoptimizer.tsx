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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePSO from "../hooks/usePSO";

const PSOoptimizer = () => {
  const [iters, setIters] = useState(2);
  const [c1, setC1] = useState(0.8);
  const [c2, setC2] = useState(0.8);
  const [w, setW] = useState(0.9);
  const [min_parts, setMinParts] = useState(5);
  const [max_parts, setMaxParts] = useState(20);
  const [dims, setDims] = useState(2);
  const [weights, setWeights] = useState([0.7, 0.3]);
  const [max_layers, setMaxLayers] = useState(32);
  const [min_layers, setMinLayers] = useState(1);
  const [max_units, setMaxUnits] = useState(256);
  const [min_units, setMinUnits] = useState(2);
  const [triggerPSO, setTriggerPSO] = useState(false);

  const isValid = () => {
    return (
      iters != 0 &&
      c1 != 0 &&
      c2 != 0 &&
      w != 0 &&
      min_parts != 0 &&
      max_parts != 0 &&
      dims != 0 &&
      weights.every((weight) => weight != 0) &&
      max_layers != 0 &&
      min_layers != 0 &&
      max_units != 0 &&
      min_units != 0
    );
  };

  const handleTriggerPSO = () => {
    setTriggerPSO(true);
  };

  const [isLoading, response, error] = usePSO(
    "/optimizer/pso",
    triggerPSO,
    iters,
    c1,
    c2,
    w,
    min_parts,
    max_parts,
    dims,
    weights,
    max_layers,
    min_layers,
    max_units,
    min_units
  );

  useEffect(() => {
    setTriggerPSO(false);
  }, [response, error]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "iters":
        setIters(Number(value));
        break;
      case "c1":
        setC1(Number(value));
        break;
      case "c2":
        setC2(Number(value));
        break;
      case "w":
        setW(Number(value));
        break;
      case "minParts":
        setMinParts(Number(value));
        break;
      case "maxParts":
        setMaxParts(Number(value));
        break;
      case "dims":
        setDims(Number(value));
        break;
      case "weights":
        setWeights(value);
        break;
      case "maxLayers":
        setMaxLayers(Number(value));
        break;
      case "minLayers":
        setMinLayers(Number(value));
        break;
      case "maxUnits":
        setMaxUnits(Number(value));
        break;
      case "minUnits":
        setMinUnits(Number(value));
        break;
      default:
        break;
    }
  };
  console.log(response);
  return (
    <>
      {isValid() ? (
        <Alert status="success" width={350}>
          <AlertIcon />
          Data is valid {triggerPSO ? 1 : 0}
        </Alert>
      ) : (
        <Alert status="error" width={350}>
          <AlertIcon /> Error in data validation
        </Alert>
      )}
      <HStack alignItems="flex-start">
        <Box width={400}>
          <Text>Iterations</Text>
          <Input
            name="iters"
            type="number"
            width={350}
            value={iters}
            onChange={handleChange}
          />

          <Text>C1</Text>
          <Input
            name="c1"
            type="number"
            width={350}
            value={c1}
            onChange={handleChange}
          />

          <Text>C2</Text>
          <Input
            name="c2"
            type="number"
            width={350}
            value={c2}
            onChange={handleChange}
          />

          <Text>W</Text>
          <Input
            name="w"
            type="number"
            width={350}
            value={w}
            onChange={handleChange}
          />

          <Text>Minimum number of particles</Text>
          <Input
            name="minParts"
            type="number"
            width={350}
            value={min_parts}
            onChange={handleChange}
          />

          <Text>Maximum number of particles</Text>
          <Input
            name="maxParts"
            type="number"
            width={350}
            value={max_parts}
            onChange={handleChange}
          />

          <Text>Dimensions</Text>
          <Input
            name="dims"
            type="number"
            width={350}
            value={dims}
            onChange={handleChange}
          />

          {/* <Text>Weights</Text>
          <Input
            name="weights"
            width={350}
            value={weights}
            onChange={handleChange}
          /> */}

          <Text>Maximum number of layers</Text>
          <Input
            name="maxLayers"
            type="number"
            width={350}
            value={max_layers}
            onChange={handleChange}
          />

          <Text>Minimum number of layers</Text>
          <Input
            name="minLayers"
            type="number"
            width={350}
            value={min_layers}
            onChange={handleChange}
          />

          <Text>Maximum number of units</Text>
          <Input
            name="maxUnits"
            type="number"
            width={350}
            value={max_units}
            onChange={handleChange}
          />

          <Text>Minimum number of units</Text>
          <Input
            name="minUnits"
            type="number"
            width={350}
            value={min_units}
            onChange={handleChange}
          />

          {isValid() ? (
            <Button colorScheme="teal" onClick={handleTriggerPSO} mt={30}>
              Input values to PSO
            </Button>
          ) : null}
        </Box>
        <Box>
          {isLoading ? (
            <Spinner size="xl" thickness="8px" speed="0.7s" />
          ) : null}
          <Code p={3} overflow="auto" whiteSpace="pre-wrap">
            {response != "" ? JSON.stringify(response) : JSON.stringify(error)}
          </Code>
        </Box>
      </HStack>
    </>
  );
};

export default PSOoptimizer;
