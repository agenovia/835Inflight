import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import FileViewer from "./components/FileViewer";
import LoadingIndicator from "./components/LoadingIndicator";
import useFetchFileStatus from "./hooks/useFetchFileStatus";
import TabViewer from "./components/TabViewer";

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
          <LoadingIndicator isLoading={isLoading} />
          {!isLoading && (
            <TabViewer inflight={<FileViewer fileDetails={data} />} />
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
