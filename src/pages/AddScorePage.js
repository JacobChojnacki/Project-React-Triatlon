import React, { useContext, useMemo, useState } from 'react';
import distances from '../utils/constants/distances';
import {
    VStack,
    Input,
    Center,
    Heading,
    Select,
    Text,
    HStack,
    Button
} from '@chakra-ui/react';
import AuthContext from '../store/auth-context';

const AddScorePage = () => {
  const authCtx = useContext(AuthContext);
  const [competitionName, setCompetitionName] = useState('');
  const [selectedDistanceName, setSelectedDistanceName] = useState(null);
  const [swimTime, setSwimTime] = useState('0');
  const [cycleTime, setCycleTime] = useState('0');
  const [runTime, setRunTime] = useState('0');


  const selectedDistance = useMemo(() => distances.find(distance => distance.name === selectedDistanceName), [selectedDistanceName]);

  const canBeSaved = competitionName
    && selectedDistanceName
    && swimTime && swimTime !== '0'
    && cycleTime && cycleTime !== '0'
    && runTime && runTime !== '0';


  const resetForm = () => {
    setCompetitionName('');
    setSelectedDistanceName(null);
    setSwimTime('0');
    setCycleTime('0');
    setRunTime('0');
  }

  const onSave = async () => {
    await fetch('https://projekt-ts-5339c-default-rtdb.firebaseio.com/scores.json', {
        method: 'POST',
        body: JSON.stringify({
            competitor: authCtx.email,
            competitionName,
            selectedDistanceName,
            swimTime,
            cycleTime,
            runTime
        })
    });
    resetForm();
  }

  return (
    <Center py={10}>
    <VStack spacing={5}>
        <Heading>Dodaj wynik</Heading>
        <Input
            variant='filled'
            placeholder='Nazwa zawodów'
            colorScheme='cyan'
            value={competitionName}
            onChange={(e) => setCompetitionName(e.target.value)}
        />
        <Select variant='filled' placeholder='Dystans' onChange={(e) => setSelectedDistanceName(e.target.value)}>
            {distances.map((distance) => (
                <option key={distance.name} value={distance.name}>{distance.name}</option>
            ))}
        </Select>
        {selectedDistance &&
            <>
                <Text textAlign='left' w='full'>Uzupełnij czasy:</Text>
                <HStack w='full'>
                    <Text>Pływanie ({selectedDistance.swim}):</Text>
                    <Input value={swimTime} onChange={(e) => setSwimTime(e.target.value)} />
                    <Text>min.</Text>
                </HStack>
                <HStack w='full'>
                    <Text>Jazda rowerem ({selectedDistance.cycle}):</Text>
                    <Input value={cycleTime} onChange={(e) => setCycleTime(e.target.value)} />
                    <Text>min.</Text>
                </HStack>
                <HStack w='full'>
                    <Text>Bieg ({selectedDistance.run}):</Text>
                    <Input value={runTime} onChange={(e) => setRunTime(e.target.value)} />
                    <Text>min.</Text>
                </HStack>
            </>
        }
        <Button variant='solid' colorScheme='green' disabled={!canBeSaved} onClick={onSave}>Zapisz</Button>
    </VStack>
    </Center>
  )
}

export default AddScorePage