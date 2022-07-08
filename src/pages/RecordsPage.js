import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
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


const RecordsPage = () => {
  const [data, setData] = useState(null);
  const authCtx = useContext(AuthContext);

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
      setData(data.filter(({ competitorEmail }) => competitorEmail === authCtx.email));
      };
      fetchHistory();
  }, []);

  return (
  <Center py={10}>
    <VStack spacing={5}>
    <Heading>Rekordy:</Heading>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Competition</Th>
                  <Th>Distance</Th>
                <Th>Swim Time</Th>
                <Th>Cycle Time</Th>
                <Th>Run Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data ? data.map(({ competitionName, cycleTime, runTime, swimTime, selectedDistanceName }) => (
                <Tr>
                  <Td>{competitionName}</Td>
                    <Td>{selectedDistanceName}</Td>
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

export default RecordsPage