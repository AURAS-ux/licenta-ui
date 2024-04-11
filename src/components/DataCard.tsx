import { VStack } from "@chakra-ui/react";
import { Patient } from "../hooks/usePatients";
import BatchesCard from "./DataCards";

interface Props {
  batch: Patient[];
}

const DataCard = ({ batch }: Props) => {
  return (
    <VStack>
      {batch.map((pacient) => (
        <BatchesCard patient={pacient} key={pacient["Patient ID"]} />
      ))}
    </VStack>
  );
};

export default DataCard;
