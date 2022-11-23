import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { Juju, Message, SignInRes, User } from './types';
import * as apiService from './api/apiService';
import * as SecureStore from 'expo-secure-store';
import { getUserByToken } from './api/apiService';
import { Contact } from 'expo-contacts';

type AppContextValue = {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  jujus: Juju[];
  setJujus: Dispatch<SetStateAction<Juju[]>>;
  sentJujus: Juju[];
  setSentJujus: Dispatch<SetStateAction<Juju[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  signUp: any;
  signOut: any;
  signIn: any;
  selectedRecipient: Contact;
  setSelectedRecipient: Dispatch<SetStateAction<Contact>>;
  selectedJuju: Message;
  setSelectedJuju: Dispatch<SetStateAction<Message>>;
};

const defaultValue: AppContextValue = {
  currentUser: null,
  setCurrentUser: () => {},
  jujus: null,
  setJujus: () => {},
  sentJujus: null,
  setSentJujus: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signUp: () => {},
  signOut: () => {},
  signIn: () => {},
  selectedRecipient: null,
  setSelectedRecipient: () => {},
  selectedJuju: null,
  setSelectedJuju: () => {},
};
export const Context = createContext(defaultValue);

export const Provider = (props: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jujus, setJujus] = useState(null);
  const [sentJujus, setSentJujus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedJuju, setSelectedJuju] = useState(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    console.log('loading storage data');
    setIsLoading(true);
    try {
      console.log('getting storage token');
      const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');
      console.log('got stored token');
      if (storedToken) {
        console.log('there is a stored token');
        const userByTokenRes = await getUserByToken(storedToken);
        console.log(`user by token res ${userByTokenRes}`);
        if (userByTokenRes.user) {
          setCurrentUser(userByTokenRes.user);
          let sortedJujus = userByTokenRes.jujus.sort((a, b) =>
            a.dateSent < b.dateSent ? 1 : b.dateSent < a.dateSent ? -1 : 0
          );
          setJujus(sortedJujus);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //loading finished
      setIsLoading(false);
    }
  }

  const signUp = async (user) => {
    console.log('signing up');
    setIsLoading(true);
    try {
      const signUpRes: SignInRes = await apiService.signUp(user);

      if (signUpRes.status === 200) {
        console.log(signUpRes.token);
        console.log('Successfully signed up!');
        setCurrentUser(signUpRes.user);
        let sortedJujus = signUpRes.jujus.sort((a, b) =>
          a.dateSent < b.dateSent ? 1 : b.dateSent < a.dateSent ? -1 : 0
        );
        setJujus(sortedJujus);
        await SecureStore.setItemAsync('JUJU_AUTH_TOKEN', signUpRes.token);
        setIsAuthenticated(true);
      } else if (signUpRes.status === 409) {
        console.log('Oop! Phone number already in use');
      } else {
        console.log('Network error. Please check your connection!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (phoneNumber, password) => {
    console.log('signing in');
    setIsLoading(true);
    try {
      const signInRes: SignInRes = await apiService.signIn(
        phoneNumber,
        password
      );

      if (signInRes.status === 200) {
        console.log(signInRes);
        console.log('Successfully signed in!');
        setCurrentUser(signInRes.user);
        let sortedJujus = signInRes.jujus.sort((a, b) =>
          a.dateSent < b.dateSent ? 1 : b.dateSent < a.dateSent ? -1 : 0
        );
        setJujus(sortedJujus);
        await SecureStore.setItemAsync('JUJU_AUTH_TOKEN', signInRes.token);
        setIsAuthenticated(true);
      } else if (signInRes.status === 409) {
        console.log('No user found for that phone number. Please register.');
      } else if (signInRes.status === 400) {
        console.log('Password does not match. Try again.');
      } else {
        console.log('Network error. Please check your connection!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log('logging out');
    await SecureStore.deleteItemAsync('JUJU_AUTH_TOKEN');
    loadStorageData();
  };

  return (
    <Context.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        jujus: jujus,
        setJujus: setJujus,
        sentJujus: sentJujus,
        setSentJujus: setSentJujus,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        signUp: signUp,
        signOut: signOut,
        signIn: signIn,
        selectedRecipient: selectedRecipient,
        setSelectedRecipient: setSelectedRecipient,
        selectedJuju: selectedJuju,
        setSelectedJuju: setSelectedJuju,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
