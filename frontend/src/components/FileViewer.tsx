import {
  Text,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

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
  return (
    <Grid
      templateAreas={`"indicator count bar"`}
      templateColumns={`"20px 50px 1fr"`}
      gap={1}
      justifyContent={"space-around"}
    >
      <GridItem w="100%" area="indicator" bgColor="red">
        <Text>Indicator</Text>
      </GridItem>
      <GridItem w="100%" area="count" bgColor="green">
        <Text>{total}</Text>
      </GridItem>
      <GridItem w="100%" area="bar" bgColor="blue">
        <Text>{folder}</Text>
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
