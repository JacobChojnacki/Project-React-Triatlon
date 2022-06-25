import React, { useEffect, useState } from 'react'
import {
  VStack,
  Center,
  Heading,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Table,
  Spinner,
} from '@chakra-ui/react';


const HistoryPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('https://projekt-ts-5339c-default-rtdb.firebaseio.com/scores.json');
      const responseData = await response.json();
      const data = [];
      for(const key in responseData) {
        data.push({
          competitionName: responseData[key].competitionName,
          competitorEmail: responseData[key].competitor,
          cycleTime: responseData[key].cycleTime,
          runTime: responseData[key].runTime,
          swimTime: responseData[key].swimTime,
          selectedDistanceName: responseData[key].selectedDistanceName,
        })
      }
    setData(data);
    };
    fetchHistory();
  }, []);


  return (
    <Center py={10}>
    <VStack spacing={10}>
      <Heading>Historia wyników</Heading>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Competitor</Th>
                <Th>Competition</Th>
                <Th>Swim Time</Th>
                <Th>Cycle Time</Th>
                <Th>Run Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data ? data.map(({ competitionName, competitorEmail, cycleTime, runTime, swimTime }) => (
                <Tr>
                  <Td>{competitorEmail}</Td>
                  <Td>{competitionName}</Td>
                  <Td>{cycleTime}</Td>
                  <Td>{runTime}</Td>
                  <Td>{swimTime}</Td>
                </Tr>
              )) : (<Spinner />)}
          </Tbody>
        </Table>
        </TableContainer>
      </VStack>
    </Center>  
  )
}

export default HistoryPage;