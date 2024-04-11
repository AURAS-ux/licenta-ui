import { Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack padding={10} spacing={10}>
      <Link to="/view-data">View Data</Link>
      <Link to="/view-batch">View Data</Link>
      {/* <Text>View Data</Text>
      <Text>View Batch</Text>
      <Text>View Logs</Text>
      <Text>Settings</Text> */}
    </VStack>
  );
};

export default NavBar;
