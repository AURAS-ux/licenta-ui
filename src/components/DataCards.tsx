import { Patient } from "../hooks/usePatients";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

interface Props {
  patient: Patient;
}

function BatchesCard({ patient }: Props) {
  return (
    <Card width="100%" borderRadius={10} overflow="hidden">
      <CardHeader>
        <Heading size="md">ID:{patient["Patient ID"]}</Heading>
      </CardHeader>
      <CardBody>
        <HStack justifyContent="space-between" flexWrap="wrap">
          <Text>ca:{patient.ca}</Text>
          <Text>age:{patient.age}</Text>
          <Text>sex:{patient.sex}</Text>
          <Text>chol:{patient.chol}</Text>
          <Text>cp:{patient.cp}</Text>
          <Text>exang:{patient.exang}</Text>
          <Text>fbs:{patient.fbs}</Text>
          <Text>num:{patient.num}</Text>
          <Text>oldpeak:{patient.oldpeak}</Text>
          <Text>restecg:{patient.restecg}</Text>
          <Text>slope:{patient.slope}</Text>
          <Text>thal:{patient.thal}</Text>
          <Text>thalach:{patient.thalach}</Text>
          <Text>trestbps:{patient.trestbps}</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default BatchesCard;
