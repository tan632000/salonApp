/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { colors } from '../../global/style';
import axiosClient from '../../apis/axiosClient';
import { setUser } from '../../redux/features/userSlice';
import { navigationRef } from '../../navigation/NavigationService';
import PasswordIcon from '../../assets/icons/password.svg';
import VisibilityOffIcon from '../../assets/icons/visibility-off.svg'

export default function SignInScreen() {
  const [textInput2Focussed, setTextInput2Focussed] = useState(false);
  const textInput1 = useRef<TextInput>(null);
  const textInput2 = useRef<TextInput>(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    try {
      axiosClient
        .post('/users/login', {
          email,
          password,
        })
        .then(async (res: any) => {
          if (res) {
            const { user, token } = res;
            dispatch(
              setUser({
                name: user,
                role: user.isAdmin === true ? 'Admin' : 'User',
                token: token,
                userId: user.id,
              }),
            );
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            const { code, data } = error.response;
            console.log(code, data);
            setMessage(data.message);
          } else if (error.request) {
            // The request was made but no response was received
            console.log('Request Error:', error.request);
            setMessage(error.request);
            // ...
          } else {
            // Something happened in setting up the request
            console.log('Error:', error.message);
            setMessage(error.message);
          }
        });
    } catch (error: any) {
      console.log('error', error);
      Alert.alert(error.name, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.text1}>Vui lòng nhập email và mật khẩu</Text>
        <Text style={styles.text1}>đã được đăng ký của bạn</Text>
      </View>
      {message !== '' && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{message}</Text>
        </View>
      )}
      <View>
        <View>
          <TextInput
            style={styles.textInput1}
            placeholder="Email"
            ref={textInput1}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.textInput2}>
          <PasswordIcon />
          <TextInput
            style={{ width: '80%' }}
            placeholder="Mật khẩu"
            ref={textInput2}
            onFocus={() => {
              setTextInput2Focussed(false);
            }}
            onBlur={() => {
              setTextInput2Focussed(true);
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <View style={{right: 10}}>
            <VisibilityOffIcon />
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="ĐĂNG NHẬP"
            buttonStyle={styles.styledButton}
            titleStyle={styles.buttonTitle}
            onPress={() => signIn()}
          />
        </View>
      </View>
      <View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{...styles.text1, textDecorationLine: 'underline'}}>
            Quên mật khẩu ?
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            HOẶC
          </Text>
        </View>

        <View style={{marginHorizontal: 10, marginTop: 30}}>
          <SocialIcon
            title="Đăng nhập với Facebook"
            button
            type="facebook"
            style={styles.socialIcon}
            onPress={() => {}}
          />
        </View>
        <View style={{marginHorizontal: 10, marginTop: 10}}>
          <SocialIcon
            title="Đăng nhập với Google"
            button
            type="google"
            style={styles.socialIcon}
            onPress={() => {}}
          />
        </View>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{...styles.text1}}>Bạn có tài khoản chưa ?</Text>
        </View>
        <View style={{marginTop: 10, alignItems: 'flex-end', marginRight: 20}}>
          <Button
            title="Tạo tài khoản"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              navigationRef.current.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styledButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff8c52',
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center', // Correct property is alignSelf, not alignItem
    marginTop: -3,
  },
  title: {
    color: '#ff8c52',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text1: {
    color: colors.grey1,
    fontSize: 16,
  },
  textInput1: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
  },
  textInput2: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 15,
  },
  socialIcon: {
    borderRadius: 12,
    height: 50,
  },
  createButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#ff8c52',
    paddingHorizontal: 20,
  },
  createButtonTitle: {
    color: '#ff8c52',
    fontSize: 16,
    fontWeight: 'bold',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  errorMessageContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
