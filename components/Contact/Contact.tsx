import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { styles } from './Contact.style';

interface ContactProps {
  onPress: (any) => void;
  contact: any;
}

export const Contact: React.FC<ContactProps> = ({ onPress, contact }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const findInitials = () => {
    let initials = [];
    if (contact.firstName) {
      initials.push(contact.firstName[0]);
    }
    if (contact.lastName) {
      initials.push(contact.lastName[0]);
    }
    return initials.join('');
  };

  const contactPressHandler = () => {
    console.log('selected on contact');
    navigation.navigate('SendingJuju');
    onPress(contact);
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={contactPressHandler}>
        <View style={styles.photoContainer}>
          <View style={styles.nameCircle}>
            <Text style={styles.initialsText}>{findInitials()} </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.nameText}>
              {contact.firstName} {contact.lastName}
            </Text>
            <Text style={styles.numberText}>
              {contact.phoneNumbers[0].digits}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
