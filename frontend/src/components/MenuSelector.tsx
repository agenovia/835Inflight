import { Button, HStack } from "@chakra-ui/react";

const MenuSelector = () => {
  const hoverTabStyle = { bg: "blue.100", borderColor: "transparent" };
  return (
    <HStack gap={10} justifyContent={"center"} alignContent={"center"} h="100%">
      <Button w="160px" _hover={hoverTabStyle} fontSize={"30px"}>
        Queue
      </Button>
      <Button w="160px" _hover={hoverTabStyle} fontSize={"30px"}>
        Mapping
      </Button>
    </HStack>
  );
};

export default MenuSelector;
