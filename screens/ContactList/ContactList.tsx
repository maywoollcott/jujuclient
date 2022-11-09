import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';

import { Context } from '../../Context';
import { styles } from './ContactList.style';
import { COLORS } from '../../globalStyles';
import { BackArrow } from '../../components/BackArrow/BackArrow';
import { Contact } from '../../components/Contact/Contact';

const ContactList: React.FC = () => {
  const context = useContext(Context);

  const [contacts, setContacts] = useState(null);
  const [searchInput, setSearchInput] = useState<String>('');
  const [filteredContacts, setfilteredContacts] = useState(null);
  const [displaySearchIcon, setDisplaySearchIcon] = useState<boolean>(true);

  const isFullContact = (contact) => {
    if (contact.firstName || contact.lastName) {
      if (contact.phoneNumbers?.length) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.LastName,
        });

        if (data.length > 0) {
          const filteredForNumberList = data.filter(isFullContact);
          setContacts(filteredForNumberList);
          setfilteredContacts(filteredForNumberList);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const tempFilteredContacts = contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toString())
    );
    if (tempFilteredContacts) setfilteredContacts(tempFilteredContacts);
  }, [searchInput]);

  const renderContactList = ({ item }) => (
    <Contact onPress={context.setSelectedRecipient} contact={item} />
  );
  return (
    <View style={styles.screenContainer}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
        <View style={styles.inputContainer}>
          <TextInput
            onFocus={() => setDisplaySearchIcon(false)}
            onBlur={() => setDisplaySearchIcon(true)}
            onChangeText={(text) => setSearchInput(text.toLowerCase())}
            style={styles.input}
          />
          {displaySearchIcon && searchInput === '' ? (
            <AntDesign
              name='search1'
              size={24}
              color={COLORS.primaryPurple}
              style={styles.searchIcon}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.ContactsContainer}>
        {contacts && (
          <FlatList
            data={filteredContacts}
            renderItem={renderContactList}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default ContactList;
