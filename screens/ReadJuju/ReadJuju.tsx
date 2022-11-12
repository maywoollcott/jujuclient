import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './ReadJuju.style';
import { Jujul } from '../../components/Jujul/Jujul';
import { Juju } from '../../types';
import { BackArrow } from '../../components/BackArrow/BackArrow';

interface IReadJujuProps {
  route: ReadJujuParams;
}

export type ReadJujuParams = {
  params: {
    juju: Juju;
    received: boolean;
  };
};

const ReadJuju: React.FC<IReadJujuProps> = ({ route }) => {
  const context = useContext(Context);
  const navigation = useNavigation();

  const logout = async () => {
    await context.signOut();
  };

  const navigateToSendingJuju = () => {
    navigation.navigate('SendingJuju');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
      </View>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderText}>
          {moment(route.params.juju.dateSent).format('MMMM D, YYYY')}
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {route.params.received
            ? context.currentUser.name
            : route.params.juju.recipientContactName}
          ,
        </Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{route.params.juju.message}</Text>
      </View>
    </View>
  );
};

export default ReadJuju;
