import { Contact } from 'expo-contacts';
import React, { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import * as apiService from '../api/apiService';
import { Context } from '../Context';
import { Juju, JujuReqObject, Message } from '../types';

const useReadJuju = () => {
  const context = useContext(Context);
  const navigation = useNavigation();

  const readJuju = async (id: string, updateObj: any, juju: Juju) => {
    let jujuIndex = context.jujus.map((juju) => juju._id).indexOf(id);

    context.setIsLoading(true);
    const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');

    const navigateToReadJuju = (juju: Juju, received: boolean) => {
      navigation.navigate('ReadJuju', {
        juju: juju,
        received: received,
      });
    };

    try {
      const updateJujuRes = await apiService.updateJuju(
        id,
        updateObj,
        storedToken
      );

      if (updateJujuRes.status === 200) {
        console.log(updateJujuRes.updatedJuju);
        console.log('Successfully updated juju');
        context.jujus.splice(jujuIndex, 1, updateJujuRes.updatedJuju);
        navigateToReadJuju(juju, true);
      } else {
        console.log('Network error. Please check your connection!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      context.setIsLoading(false);
    }
  };

  return { readJuju };
};

export default useReadJuju;
