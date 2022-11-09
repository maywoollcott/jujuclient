import React from 'react';
import { User } from '../types';
import * as SecureStore from 'expo-secure-store';
import { getUserByToken } from '../api/apiService';

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  // React.useEffect(() => {
  //   const setUserByToken = async () => {
  //     const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');

  //     if (storedToken) {
  //       const userByTokenRes = await getUserByToken(storedToken);
  //       console.log(`user by token res ${userByTokenRes}`);
  //       if (userByTokenRes.user) {
  //         setUser(userByTokenRes.user);
  //       } else {
  //         setUser(undefined);
  //       }
  //     } else {
  //       setUser(undefined);
  //     }
  //   };

  //   setUserByToken();
  // }, []);

  return {
    user,
  };
}
