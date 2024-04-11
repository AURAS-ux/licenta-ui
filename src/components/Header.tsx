import { HStack, Image, Link, Text } from "@chakra-ui/react";
import logimg from "../assets/log.png";

const Header = () => {
  return (
    <>
      <HStack display="flex" justifyContent="space-between" padding="20px">
        <Text size="xs">ver 0.0.1</Text>
        <Link
          href="http://localhost:5601/app/kibana_overview#/"
          isExternal
          display="flex"
        >
          <Image src={logimg} alt="ViewLogs" />
          <Text>View</Text>
        </Link>
      </HStack>
    </>
  );
};

export default Header;
