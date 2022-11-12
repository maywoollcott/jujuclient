import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './Home.style';
import { Jujul } from '../../components/Jujul/Jujul';

const Home: React.FC = () => {
  const context = useContext(Context);
  const navigation = useNavigation();

  const logout = async () => {
    await context.signOut();
  };

  const navigateToSendingJuju = () => {
    navigation.navigate('SendingJuju');
  };

  const navigateToInbox = () => {
    navigation.navigate('Inbox');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hi, {context.currentUser.name}.</Text>
        <SolidButton
          onPress={navigateToSendingJuju}
          buttonText='Send a juju'
          widthUnits={0.6}
        />
        <SolidButton
          onPress={navigateToInbox}
          buttonText='Read my jujus'
          widthUnits={0.6}
        />
        <View style={styles.dailyJujuContainer}>
          <Text style={styles.subheaderText}>DAILY JUJU</Text>
          <Text style={styles.dailyJujuText}>
            Who is someone that always fights for the underdog?
          </Text>
          <OutlinedButton
            onPress={() => console.log('Answer')}
            buttonText='Answer'
            widthUnits={0.6}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
