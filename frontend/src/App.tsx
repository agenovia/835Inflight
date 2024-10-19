import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import useFetchFileStatus from "./hooks/useFetchFileStatus";
import FileViewer from "./components/FileViewer";

// const fetchInflight = () => {
//   axios.get("http://localhost:8000/inflight").then((r) => {
//     console.log(r.data);
//     return r.data;
//   });
// };

const fetchInflight = async () => {
  const { data } = await axios.get("http://localhost:8000/inflight");
  return data;
};

function App() {
  const { isLoading, isError, error, data } = useFetchFileStatus({
    mode: "inflight",
  });

  if (error) {
    console.error(error);
  }

  if (!isError) {
    console.log(data);
  }

  return (
    <>
      <Grid
        templateAreas={`"header header"
                        "viewer viewer"
                      `}
        templateColumns={"1fr 1fr"}
        templateRows={"90px 1fr"}
        h="70vh"
        w="70vw"
        gap={2}
      >
        <GridItem area="header" bgColor={"tomato"}></GridItem>
        <GridItem area="viewer" w="inherit" h="inherit">
          {isLoading ? (
            <Heading>Loading</Heading>
          ) : (
            <FileViewer fileDetails={data} />
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
