import { Fade, Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import FileViewer from "./components/FileViewer";
import LoadingIndicator from "./components/LoadingIndicator";
import MenuSelector from "./components/MenuSelector";
import TabViewer from "./components/TabViewer";
import useFetchFileStatus from "./hooks/useFetchFileStatus";

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
        templateRows={"70px 1fr"}
        h="70vh"
        w="70vw"
        gap={2}
      >
        <GridItem area="header">
          {!isLoading && (
            <Fade in={!isLoading}>
              <MenuSelector />
            </Fade>
          )}
        </GridItem>
        <GridItem area="viewer">
          <LoadingIndicator isLoading={isLoading} />
          {!isLoading && (
            <Fade in={!isLoading} transition={{ enter: { duration: 2.5 } }}>
              <TabViewer inflight={<FileViewer fileDetails={data} />} />
            </Fade>
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
