import { HStack, Image, Link as ChackraLink, Text } from "@chakra-ui/react";
import logimg from "../assets/log.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <HStack display="flex" justifyContent="space-between" padding="20px">
        <Link to="/">ver 0.0.2</Link>
        <ChackraLink
          href="http://localhost:5601/app/kibana_overview#/"
          isExternal
          display="flex"
        >
          <Image src={logimg} alt="ViewLogs" />
          <Text>View</Text>
        </ChackraLink>
      </HStack>
    </>
  );
};

export default Header;
