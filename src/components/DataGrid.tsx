import { SimpleGrid } from "@chakra-ui/react";
import BatchesCard from "./DataCards";
import usePatients from "../hooks/usePatients";

function DataGrid() {
  const { data } = usePatients("/get_data");
  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={3} padding="10px">
        {data.map((pacient) => (
          <BatchesCard key={pacient["Patient ID"]} patient={pacient} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default DataGrid;
