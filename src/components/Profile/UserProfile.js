import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import {
  Center,
  Heading,
} from '@chakra-ui/react';

const UserProfile = () => {
  return (
    <Center>
      <ProfileForm />
    </Center>
  );
};

export default UserProfile;
