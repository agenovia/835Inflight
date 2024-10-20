import {
  Badge,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoPieChartOutline } from "react-icons/io5";

import { IoFolderOpenOutline } from "react-icons/io5";

export interface FileDetail {
  fullPath: string;
  fileName: string;
  fileFolder: string;
  stat: {
    created: number;
    modified: number;
  };
}

interface Props {
  fileDetails: FileDetail[];
}

interface FileEntryProps {
  folder: string;
  total: number;
}
const FileEntry = ({ folder, total }: FileEntryProps) => {
  const centeredStyle = {
    justifyContent: "center",
    alignContent: "center",
  };

  return (
    <Grid
      templateAreas={`"indicator count bar"`}
      templateColumns={`"100px 50px 1fr"`}
      templateRows={"60px"}
      gap={3}
      justifyContent={"left"}
      w="100%"
      p={4}
    >
      <GridItem pt={6} area="indicator" sx={centeredStyle}>
        <Icon as={IoPieChartOutline} boxSize={8} />
      </GridItem>
      <GridItem pt={4} area="count" sx={centeredStyle}>
        <Badge
          title={`${total} file(s) in ${folder}`}
          sx={centeredStyle}
          boxSize={10}
          borderRadius={10}
          shadow="md"
        >
          {total}
        </Badge>
      </GridItem>
      <GridItem mt={4} area="bar" sx={centeredStyle}>
        {/* we need a file indicator */}
        <HStack p={2} shadow={"lg"} borderRadius={10}>
          <Icon boxSize={6} as={IoFolderOpenOutline} />
          <Text>{folder}</Text>
        </HStack>
      </GridItem>
    </Grid>
  );
};

const FileViewer = ({ fileDetails }: Props) => {
  const fileGrp = fileDetails.reduce<Record<string, number>>((acc, file) => {
    if (acc[file.fileFolder]) {
      acc[file.fileFolder]++;
    } else {
      acc[file.fileFolder] = 1;
    }
    return acc;
  }, {});

  return (
    <VStack
      gap={6}
      p={4}
      borderRadius={10}
      shadow={"md"}
      w="inherit"
      h="inherit"
      overflowY={"auto"}
    >
      {Object.entries(fileGrp).map(([folder, total]) => (
        <FileEntry folder={folder} total={total} />
      ))}
    </VStack>
  );
};

export default FileViewer;
