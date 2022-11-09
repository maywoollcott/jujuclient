import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { JujuReqObject, SignUpUserReq } from '../types';

const { manifest } = Constants;
const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:4001`)
    : `api.example.com`;
const BASE_URL = `http://${api}`;

export const signUp = async (user: SignUpUserReq) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/signup`, {
      name: user.name,
      password: user.password,
      phoneNumber: user.phoneNumber,
      jujuls: user.jujuls,
    });

    console.log(data);
    console.log(status);

    return {
      status: status,
      user: data.user,
      token: data.authToken,
      jujus: data.jujus,
    };
  } catch (error: any) {
    const { message, response } = error;

    return {
      message: message,
      status: response.status,
    };
  }
};

export const signIn = async (phoneNumber: string, password: string) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/login`, {
      phoneNumber,
      password,
    });

    console.log(data);
    return {
      status: status,
      user: data.user,
      token: data.authToken,
      jujus: data.jujus,
    };
  } catch (error: any) {
    const { message, response } = error;
    console.log(message);
    return {
      message: message,
      status: response.status,
    };
  }
};

export const getUserByToken = async (token: string) => {
  console.log('getting user by token api call');
  try {
    const { data, status } = await axios.get(`${BASE_URL}/userbytoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: status,
      user: data.user,
      jujus: data.jujus,
    };
  } catch (error: any) {
    const { message } = error;

    return {
      message: message,
      status: 500,
    };
  }
};

export const logout = async (key: string) => {
  const result = await SecureStore.deleteItemAsync('DIVII_TOKEN_AUTH');
  return result;
};

export const fetchAllMessages = async (token: string) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: status,
      messages: data.messages,
    };
  } catch (error: any) {
    const { message } = error;

    return {
      message: message,
      status: 500,
    };
  }
};

//juju
export const sendJuju = async (juju: JujuReqObject, token: string) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/sendjuju`, juju, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    console.log(status);

    return {
      status: status,
    };
  } catch (error: any) {
    const { message, response } = error;

    return {
      message: message,
      status: response.status,
    };
  }
};

export const updateJuju = async (id: string, updateObj: any, token: string) => {
  try {
    console.log('updating juju apiservice');
    const { data, status } = await axios.post(
      `${BASE_URL}/updatejuju`,
      {
        id: id,
        updateObj: updateObj,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    console.log(status);

    return {
      status: status,
      updatedJuju: data.newJuju,
    };
  } catch (error: any) {
    const { message, response } = error;

    return {
      message: message,
      status: response.status,
    };
  }
};
