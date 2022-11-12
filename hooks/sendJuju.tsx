import { Contact } from 'expo-contacts';
import React, { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import * as apiService from '../api/apiService';
import { Context } from '../Context';
import { JujuReqObject, Message } from '../types';

const useSendJuju = () => {
  const context = useContext(Context);
  const navigation = useNavigation();

  const sendJuju = async (
    jujuMessage: Message,
    recipient: Contact,
    daily: boolean
  ) => {
    console.log(recipient);
    let number = recipient.phoneNumbers[0].digits;
    console.log(number);

    let juju: JujuReqObject = {
      messageId: jujuMessage._id,
      message: jujuMessage.message,
      senderId: context.currentUser._id,
      recipientPhoneNumber: number,
      recipientContactName: recipient.name,
      opened: false,
      dateSent: Date.now(),
    };

    console.log(juju);
    context.setIsLoading(true);
    const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');
    try {
      const sendJujuRes = await apiService.sendJuju(juju, storedToken);

      if (sendJujuRes.status === 200) {
        console.log(sendJujuRes);
        console.log('Successfully sent juju');
        navigation.navigate('Home');
      } else {
        console.log('Network error. Please check your connection!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      context.setIsLoading(false);
    }
  };

  return { sendJuju };
};

export default useSendJuju;
