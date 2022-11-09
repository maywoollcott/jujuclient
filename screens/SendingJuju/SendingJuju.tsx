import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './SendingJuju.style';
import { COLORS } from '../../globalStyles';
import { BackArrow } from '../../components/BackArrow/BackArrow';
import { Jujul } from '../../components/Jujul/Jujul';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSendJuju from '../../hooks/sendJuju';

const SendingJuju: React.FC = () => {
  const context = useContext(Context);
  const navigation = useNavigation();
  const sendJuju = useSendJuju();

  const openContactsHandler = async () => {
    navigation.navigate('ContactList');
  };

  const openPickJujuHandler = async () => {
    navigation.navigate('PickJuju');
  };

  const sendJujuHandler = async () => {
    sendJuju.sendJuju(context.selectedJuju, context.selectedRecipient, false);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
      </View>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sending juju</Text>
        {context.selectedRecipient ? (
          <TouchableOpacity onPress={openContactsHandler}>
            <Text style={styles.selectedOptionText}>
              {context.selectedRecipient.name}
            </Text>
          </TouchableOpacity>
        ) : (
          <OutlinedButton
            onPress={openContactsHandler}
            buttonText={'Pick a person'}
            widthUnits={0.6}
          />
        )}
        <View style={styles.prayingIcon}>
          <MaterialCommunityIcons
            name='hands-pray'
            size={50}
            color={COLORS.primaryPurple}
          />
        </View>
        {context.selectedJuju ? (
          <TouchableOpacity onPress={openPickJujuHandler}>
            <Text style={styles.selectedOptionText}>
              {context.selectedJuju.message}
            </Text>
          </TouchableOpacity>
        ) : (
          <OutlinedButton
            onPress={openPickJujuHandler}
            buttonText={'Pick a juju'}
            widthUnits={0.6}
          />
        )}
        <View style={styles.sendButtonContainer}>
          <SolidButton
            onPress={sendJujuHandler}
            buttonText='Send'
            widthUnits={0.6}
          />
          <Text style={styles.jujulSubtext}>
            +1{' '}
            <FontAwesome5 name='gem' size={18} color={COLORS.primaryPurple} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SendingJuju;
