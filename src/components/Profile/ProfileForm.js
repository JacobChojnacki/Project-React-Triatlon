import React, { useState } from 'react'
import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import {
    VStack,
    Center,
    Heading,
    Input,
    Button,
} from "@chakra-ui/react";
import paths from '../../utils/constants/paths';


const ProfileForm = () => {
    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const authCtx = useContext(AuthContext);

    const submitHandler = event => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAv2LF21yD-u6-eBzrqAejVgMmp0xmdQ9U', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: newPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            history.replace(paths.HOME);
        })
    }

    return (
        <Center py={10}>
            <VStack spacing={5}>
                <Heading>Nowe Hasło:</Heading>
                <Input placeholder='Nowe hasło' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password'/>
                <Button onClick={submitHandler}>Zmień hasło</Button>
            </VStack>
        </Center>
    );
}

export default ProfileForm;
