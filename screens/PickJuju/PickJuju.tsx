import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './PickJuju.style';
import { COLORS } from '../../globalStyles';
import { BackArrow } from '../../components/BackArrow/BackArrow';
import { Jujul } from '../../components/Jujul/Jujul';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as apiService from '../../api/apiService';
import { Message } from '../../types';

const PickJuju: React.FC = () => {
  const context = useContext(Context);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const fetchAllMessages = async () => {
    console.log('fetching messages');
    context.setIsLoading(true);
    const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');
    try {
      const fetchAllMessagesRes = await apiService.fetchAllMessages(
        storedToken
      );

      if (fetchAllMessagesRes.status === 200) {
        console.log(fetchAllMessagesRes);
        console.log('Successfully fetched messages');
        setMessages(fetchAllMessagesRes.messages);
      } else {
        console.log('Network error. Please check your connection!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      context.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const onMessageClick = (message: Message) => {
    console.log(message);
    context.setSelectedJuju(message);
    navigation.navigate('SendingJuju');
  };
  const renderMessageList = ({ item }) => (
    <TouchableOpacity onPress={() => onMessageClick(item)} key={item.id}>
      <Text style={styles.messageText}>{item.message}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.screenContainer}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
      </View>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Admiration</Text>
      </View>
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessageList}
          keyExtractor={(item) => {
            return item._id;
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
        />
      </View>
    </View>
  );
};

export default PickJuju;
