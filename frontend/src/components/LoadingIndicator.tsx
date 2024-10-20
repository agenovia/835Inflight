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
      thickness="6px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      boxSize={"200px"}
    />
  );
};

export default LoadingIndicator;
