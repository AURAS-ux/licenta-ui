import { Input, SimpleGrid } from "@chakra-ui/react";
import BatchesCard from "./DataCards";
import usePatients from "../hooks/usePatients";
import { useState } from "react";

function DataGrid() {
  const [value, setValue] = useState("");
  const { data } = usePatients("/" + value + "/get_data");
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <>
      <Input
        placeholder="Enter the number of the desired batch of data"
        size="lg"
        value={value}
        onChange={handleChange}
      />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={3} padding="10px">
        {data.map((pacient) => (
          <BatchesCard key={pacient["Patient ID"]} patient={pacient} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default DataGrid;
