import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack padding={5} spacing={10}>
      <Link to="/view-data">View Data</Link>
      <Link to="/manage-data">Manage Data</Link>
      {/* <Link to="/llm">Classify data TBD</Link> */}
      <Link to="/pso">Optimize with PSO</Link>
      <Link to="/llm">Optimize with LLM</Link>
      <Link to="/stats">Optimization statistics</Link>
      {/* <Link to="/llm">Classification assistent TBD</Link> */}
      {/* <Link to="/view-batch">View Batch</Link> */}
      {/* <Text>View Data</Text>
      <Text>View Batch</Text>
      <Text>View Logs</Text>
      <Text>Settings</Text> */}
    </VStack>
  );
};

export default NavBar;
