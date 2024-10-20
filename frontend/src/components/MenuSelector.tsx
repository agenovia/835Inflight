import { Button, HStack } from "@chakra-ui/react";

const MenuSelector = () => {
  return (
    <HStack gap={10} justifyContent={"center"} alignContent={"center"} h="100%">
      <Button fontSize={"30px"}>Queue</Button>
      <Button fontSize={"30px"}>Mapping</Button>
    </HStack>
  );
};

export default MenuSelector;
