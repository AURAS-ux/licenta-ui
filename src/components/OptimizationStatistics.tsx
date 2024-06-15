import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useStats from "../hooks/useStats";
import { Button, Text } from "@chakra-ui/react";

function hasMoreValues(list1: Number[], list2: Number[]) {
  if (list1.length > list2.length) return list1;
  return list2;
}

const OptimizationStatistics = () => {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { response, error, isLoading } = useStats("/getStats", triggerRefresh);
  const [pso_times, setPsoTimes] = useState([]);
  const [pso_classification_times, setPsoClassificationTimes] = useState([]);
  const [pso_acc, setPsoAcc] = useState([]);
  const [llm_times, setLlmTimes] = useState([]);
  const [llm_classification_times, setLlmClassificationTimes] = useState([]);
  const [llm_acc, setLlmAcc] = useState([]);

  useEffect(() => {
    if (response != undefined && response != null && response != "") {
      console.log(response);
      setPsoTimes(eval(response)["pso_time"]);
      setPsoClassificationTimes(eval(response)["pso_classification"]);
      setPsoAcc(eval(response)["pso_accuracy"]);
      setLlmTimes(eval(response)["llm_time"]);
      setLlmClassificationTimes(eval(response)["llm_classification"]);
      setLlmAcc(eval(response)["llm_accuracy"]);
    }
  }, [response]);

  const runTimeData = pso_times.map((time, index) => ({
    name: (index + 1).toString(), // Convert index to name starting at "1"
    pso_time: time,
    llm_time: index < llm_times.length ? llm_times[index] : null, // Use llm_time if available, else null
  }));

  const timeData = pso_classification_times.map((time, index) => ({
    name: (index + 1).toString(), // Convert index to name starting at "1"
    pso_time: time,
    llm_time:
      index < llm_classification_times.length
        ? llm_classification_times[index]
        : null, // Use llm_time if available, else null
  }));

  const accData = pso_acc.map((time, index) => ({
    name: (index + 1).toString(), // Convert index to name starting at "1"
    pso_time: time,
    llm_time: index < llm_acc.length ? llm_acc[index] : null, // Use llm_time if available, else null
  }));

  const handleRefresh = () => {
    setTriggerRefresh(true);
  };

  useEffect(() => {
    setTriggerRefresh(false);
  }, [response]);

  return (
    <>
      <Text m={5}>Runtime of optimization task</Text>
      <LineChart
        width={1500}
        height={300}
        data={runTimeData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[-50]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pso_time"
          stroke="#8884d8"
          name="PSO"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="llm_time"
          stroke="#82ca9d"
          name="LLM"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <Text m={5}>Classification time</Text>
      <LineChart
        width={1500}
        height={300}
        data={timeData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pso_time"
          stroke="#8884d8"
          name="PSO"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="llm_time"
          stroke="#82ca9d"
          name="LLM"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <Text m={5}>Accuracy</Text>
      <LineChart
        width={1500}
        height={300}
        data={accData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, ]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pso_time"
          stroke="#8884d8"
          name="PSO"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="llm_time"
          stroke="#82ca9d"
          name="LLM"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <Button colorScheme="teal" onClick={handleRefresh} mt={30} mb={20}>
        Refresh
      </Button>
    </>
  );
};

export default OptimizationStatistics;
