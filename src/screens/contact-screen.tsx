import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";
import Constants from "expo-constants";
import ContactList from "../components/contact-list";
import { getContactList } from "../services";

const keyExtractor = ({ phone }: any) => phone;

export default function ContactScreen({ navigation }: any) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const contacts = await getContactList();
      if (contacts) {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    };
    fetchContacts();
  }, []);

  const renderContact = ({ item }: any) => {
    const { name, picture, phone } = item;
    return <ContactList name={name} picture={picture} phone={phone} />;
  };

  return (
    <View style={styles.container}>
      <Button
        title="Detail"
        onPress={() => navigation.navigate("Contact Detail")}
      />
      {loading && <ActivityIndicator size={"large"} />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
});
