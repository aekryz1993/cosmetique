import React, {useState, useEffect} from 'react';
import {View, Picker, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import {Q} from '@nozbe/watermelondb';

import {addUser, admin, employee} from '../seed/user';
import {TextInputField} from '../elements/TextInput';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

const HomeScreen = ({navigation, database}) => {
  const usersCollection = database.collections.get('users');

  const [category, setCategory] = useState('employee');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const createAdmin = () =>
      new Promise((resolve, reject) => {
        const newAdmin = addUser(database, usersCollection, admin);
        resolve(newAdmin);
      });

    createAdmin().then(() => addUser(database, usersCollection, employee));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    try {
      const clearFields = () => {
        setUsername(null);
        setPassword(null);
      };

      const usersQueried = await usersCollection
        .query(Q.where('username', username))
        .fetch();

      const user = usersQueried[0];

      if (!user) {
        clearFields();
        return;
      }

      if (category === 'admin') {
        const isAdmin = await user.checkAdmin(user._raw);
        if (!isAdmin) {
          clearFields();
          return;
        }
      }

      const rightPassword = await user.checkAuthPassword(password, user._raw);

      if (rightPassword && category === 'admin') {
        clearFields();
        await AsyncStorage.setItem('@user_token', user._raw.id);
        await AsyncStorage.setItem('@screen_token', 'admin');
        navigation.navigate('App');
      } else if (rightPassword && category === 'employee') {
        clearFields();
        await AsyncStorage.setItem('@user_token', user._raw.id);
        await AsyncStorage.setItem('@screen_token', 'employee');
        navigation.navigate('App');
      } else {
        clearFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.container}>
      <Picker
        selectedValue={category}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
        <Picker.Item label="Utilisateur" value="employee" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <TextInputField
        placeholder="Entrez le nom d'utilisateur"
        onChangeText={t => setUsername(t)}
        value={username}
        // errorMessage={error}
      />

      <TextInputField
        placeholder="Entrez le mot de passe"
        onChangeText={t => setPassword(t)}
        value={password}
        secureTextEntry={true}
        // errorMessage={error}
      />

      <Button title="Start" onPress={() => login()} />
    </View>
  );
};

export default HomeScreen;
