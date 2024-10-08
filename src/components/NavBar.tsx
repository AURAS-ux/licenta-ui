import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack padding={5} spacing={10}>
      <Link to="/view-data">View Data</Link>
      <Link to="/manage-data">Manage Data</Link>
      <Link to="/classify">Classify data</Link>
      <Link to="/pso">Optimize with PSO</Link>
      <Link to="/llm">Optimize with LLM</Link>
      <Link to="/stats">Optimization statistics</Link>
    </VStack>
  );
};

export default NavBar;
