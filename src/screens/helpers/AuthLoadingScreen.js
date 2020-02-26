import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInputField} from '../../elements/TextInput';
import {Button} from 'react-native-elements';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

const AuthLoadingScreen = ({navigation, database}) => {
  const [authorized, setauthorized] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    verifyAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initializing) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing]);

  useEffect(() => {
    if (authorized) {
      _bootstrapAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  const verifyAuthToken = async () => {
    const authToken = await database.adapter.getLocal('auth_token');
    if (authToken) {
      setauthorized(true);
    } else {
      setModelOpen(true);
    }
  };

  const _bootstrapAsync = async () => {
    AsyncStorage.getItem('@user_token').then(userToken => {
      setModelOpen(false);
      navigation.navigate(userToken ? 'App' : 'Auth');
    });
  };

  const onAuthStateChanged = async user => {
    setInitializing(false);
    await database.adapter.setLocal('auth_token', user.uid);
    setauthorized(true);
  };

  const authorizedApp = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setInitializing(true))
      .catch(() => console.log('Contact support to get authentication'));
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <Modal
        animationType="fade"
        visible={modelOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={style.container}>
          <TextInputField
            placeholder="Entrez votre email"
            onChangeText={t => setemail(t)}
            value={email}
          />
          <TextInputField
            placeholder="Entrez votre mot de passe"
            onChangeText={t => setpassword(t)}
            value={password}
            secureTextEntry={true}
          />
          <Button title="Start" onPress={() => authorizedApp()} />
        </View>
      </Modal>
    </View>
  );
};

export default AuthLoadingScreen;
