import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './Inbox.style';
import { Jujul } from '../../components/Jujul/Jujul';
import { Juju } from '../../types';
import { COLORS } from '../../globalStyles';
import useReadJuju from '../../hooks/readJuju';
import { fetchJujus } from '../../api/apiService';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Inbox: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const context = useContext(Context);
  const navigation = useNavigation();
  const [tabSelected, setTabSelected] = useState('Inbox');
  const [unreadJujus, setUnreadJujus] = useState([]);
  const [readJujus, setReadJujus] = useState([]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshJujus();
    setRefreshing(false);
    console.log('refreshed');
  }, []);

  const readJuju = useReadJuju();

  const refreshJujus = async () => {
    const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');
    const fetchJujusRes = await fetchJujus(
      context.currentUser.phoneNumber,
      storedToken
    );
    if (fetchJujusRes.status === 200 && fetchJujusRes.jujus) {
      console.log(fetchJujusRes.sentJujus);
      context.setJujus(fetchJujusRes.jujus);
      context.setSentJujus(fetchJujusRes.sentJujus);
    } else {
      console.log('Issue refreshing jujus');
    }
  };

  const filterJujus = () => {
    console.log(context.jujus);
    let unread = context.jujus.filter((juju) => juju.opened === false);
    let read = context.jujus.filter((juju) => juju.opened === true);

    setUnreadJujus(unread);
    setReadJujus(read);
  };

  useEffect(() => {
    filterJujus();
  }, [context.jujus]);

  useFocusEffect(
    React.useCallback(() => {
      refreshJujus();
      filterJujus();
    }, [])
  );

  const logout = async () => {
    await context.signOut();
  };

  const navigateToReadJuju = (juju: Juju, received: boolean) => {
    navigation.navigate('ReadJuju', {
      juju: juju,
      received: received,
    });
  };

  const readUnreadJuju = async (jujuId: string, juju: Juju) => {
    console.log('reading juju');
    await readJuju.readJuju(jujuId, { opened: true }, juju);
    filterJujus();
  };

  const unreadJuju = (date: string, key: string, juju: Juju) => {
    return (
      <View>
        <OutlinedButton
          onPress={() => readUnreadJuju(key, juju)}
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
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        contentContainerStyle={styles.screenContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.jujulContainer}>
          <Jujul />
        </View>
        <View style={styles.tabContainer}>
          {tabSelected === 'Inbox' ? (
            <SolidButton
              onPress={refreshJujus}
              buttonText='Inbox'
              widthUnits={0.4}
            />
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
            {unreadJujus.length > 0 && (
              <View style={styles.unreadJujuContainer}>
                {unreadJujus.map((juj: Juju) =>
                  unreadJuju(juj.dateSent, juj._id, juj)
                )}
              </View>
            )}
            <View style={styles.readJujuContainer}>
              {readJujus.map((juj: Juju) => (
                <TouchableOpacity onPress={() => navigateToReadJuju(juj, true)}>
                  <Text style={styles.readJujuText}>{juj.message}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheaderText}>
                You've sent {context.sentJujus.length} jujus. Thanks for
                spreading positivity and gratitude.
              </Text>
            </View>
            <View style={styles.unreadJujuContainer}>
              {context.sentJujus.map((juj: Juju) => (
                <View>
                  <OutlinedButton
                    onPress={() => navigateToReadJuju(juj, false)}
                    buttonText={juj.recipientContactName}
                    widthUnits={0.8}
                  />
                  {juj.opened === true && (
                    <View style={styles.envelopeContainer}>
                      <SimpleLineIcons
                        name='envelope-open'
                        size={20}
                        color={COLORS.primaryPurple}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Inbox;
