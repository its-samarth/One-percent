import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { login } from '../redux/LoginSlice';
import { AppDispatch, RootState } from '../redux/Store';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>(); 
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { status, error } = useSelector((state: RootState) => state.login); 
  const handleLogin = () => {
    dispatch(login({ username, password })).then((result: any) => { 
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.replace('List' as never); // Navigate to the 'List' screen
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://media.licdn.com/dms/image/D4D22AQEx-5V0rXAvIg/feedshare-shrink_2048_1536/0/1709014274664?e=1718841600&v=beta&t=Wf1nVrXGNJnCoWI9i8NpCBQW9aaaJqBfb0YtKhM12Co' }}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username or email"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
            {status === 'loading' && <Text>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: To add a dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Decreased opacity for more transparency
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#C79E3A',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
