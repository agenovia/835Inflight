import {
  Heading,
  StackProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  inflight: ReactElement<StackProps>;
}

const TabViewer = ({ inflight }: Props) => {
  const selectedTabStyle = { color: "white", bg: "blue.500" };
  const hoverTabStyle = { bg: "blue.100", borderColor: "transparent" };

  return (
    <Tabs defaultIndex={1}>
      <TabList
        gap={8}
        w="100%"
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Tab _hover={hoverTabStyle} _selected={selectedTabStyle} w="80px">
          Ready
        </Tab>
        <Tab _hover={hoverTabStyle} _selected={selectedTabStyle} w="80px">
          Inflight
        </Tab>
        <Tab _hover={hoverTabStyle} _selected={selectedTabStyle} w="80px">
          Archived
        </Tab>
      </TabList>
      <TabPanels overflow={"hidden"}>
        <TabPanel>
          <Heading>Ready</Heading>
        </TabPanel>
        <TabPanel>{inflight}</TabPanel>
        <TabPanel>
          <Heading>Archived</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabViewer;
