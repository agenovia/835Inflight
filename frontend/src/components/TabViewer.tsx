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
  return (
    <>
      <Tabs>
        <TabList w="100%" justifyContent={"center"} alignContent={"center"}>
          <Tab>Inflight</Tab>
          <Tab>Ready</Tab>
          <Tab>Archived</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{inflight}</TabPanel>
          <TabPanel>
            <Heading>Ready</Heading>
          </TabPanel>
          <TabPanel>
            <Heading>Archived</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabViewer;
