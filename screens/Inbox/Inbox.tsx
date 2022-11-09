import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './Inbox.style';
import { Jujul } from '../../components/Jujul/Jujul';
import { Juju } from '../../types';
import { COLORS } from '../../globalStyles';
import useReadJuju from '../../hooks/readJuju';

const Inbox: React.FC = () => {
  const context = useContext(Context);
  const navigation = useNavigation();
  const [tabSelected, setTabSelected] = useState('Inbox');
  const [unreadJujus, setUnreadJujus] = useState([]);
  const [readJujus, setReadJujus] = useState([]);

  const readJuju = useReadJuju();

  const filterJujus = () => {
    let unread = context.jujus.filter((juju) => juju.opened === false);
    let read = context.jujus.filter((juju) => juju.opened === true);

    setUnreadJujus(unread);
    setReadJujus(read);
  };

  useEffect(() => {
    filterJujus();
  }, []);

  const logout = async () => {
    await context.signOut();
  };

  const navigateToSendingJuju = () => {
    navigation.navigate('SendingJuju');
  };

  const readUnreadJuju = async (jujuId: string) => {
    console.log('reading juju');
    await readJuju.readJuju(jujuId, { opened: true });
    filterJujus();
  };

  const unreadJuju = (date: string, key: string) => {
    return (
      <View>
        <OutlinedButton
          onPress={() => readUnreadJuju(key)}
          buttonText={moment(date).format('MMMM D, YYYY')}
          widthUnits={0.75}
          key={key}
        />
        <View style={styles.unreadDotContainer}>
          <Entypo name='dot-single' size={50} color={COLORS.primaryPurple} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.tabContainer}>
        {tabSelected === 'Inbox' ? (
          <SolidButton onPress={() => {}} buttonText='Inbox' widthUnits={0.4} />
        ) : (
          <OutlinedButton
            onPress={() => setTabSelected('Inbox')}
            buttonText='Inbox'
            widthUnits={0.4}
          />
        )}
        {tabSelected === 'Inbox' ? (
          <OutlinedButton
            onPress={() => setTabSelected('Outbox')}
            buttonText='Outbox'
            widthUnits={0.4}
          />
        ) : (
          <SolidButton
            onPress={() => {}}
            buttonText='Outbox'
            widthUnits={0.4}
          />
        )}
      </View>
      {tabSelected === 'Inbox' ? (
        <>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>
              Wow, you've been sent {context.jujus.length} jujus. Way to go!
            </Text>
          </View>
          <View>
            {unreadJujus.map((juj: Juju) => unreadJuju(juj.dateSent, juj._id))}
          </View>
          <View style={styles.readJujuContainer}>
            {readJujus.map((juj: Juju) => (
              <Text style={styles.readJujuText}>{juj.message}</Text>
            ))}
          </View>
        </>
      ) : (
        <View>
          <Text>Outbox</Text>
          <OutlinedButton
            onPress={() => console.log(context.jujus)}
            buttonText='Outbox'
            widthUnits={0.4}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Inbox;
