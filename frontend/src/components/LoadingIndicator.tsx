import { Spinner } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
}

const LoadingIndicator = ({ isLoading }: Props) => {
  if (!isLoading) {
    return;
  }

  return (
    <Spinner
      speed="1.5s"
      thickness="2px"
      variant={"bold"}
      emptyColor="gray.200"
      color="blue.500"
      boxSize={"200px"}
    />
  );
};

export default LoadingIndicator;
