/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {Formik} from 'formik';
import {navigationRef} from '../../navigation/NavigationService';
import axiosClient from '../../apis/axiosClient';
import {setUser} from '../../redux/features/userSlice';
import { colors } from '../../global/style';
import EmailIcon from '../../assets/icons/email.svg';
import LockIcon from '../../assets/icons/password.svg';
import VisibilityOffIcon from '../../assets/icons/visibility-off.svg';

interface SignUpValues {
  phone_number: string;
  name: string;
  family_name: string;
  password: string;
  email: string;
  username: string;
  age: string;
}

const initialValues: SignUpValues = {
  phone_number: '',
  name: '',
  family_name: '',
  password: '',
  email: '',
  username: '',
  age: '',
};

export default function SignUpScreen() {
  const [passwordFocussed, setPasswordFocussed] = useState(false);
  const dispatch = useDispatch();

  function signUp(data: SignUpValues) {
    try {
      const {email, password, family_name, name, phone_number, age} = data;
      axiosClient
        .post('/users/register', {
          email,
          password,
          firstName: family_name,
          lastName: name,
          phoneNumber: phone_number,
          isAdmin: false,
          photo: '',
          age,
        })
        .then(async (data: any) => {
          if (data) {
            const {user, token} = data;
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
        .catch(err => {
          console.log(err);
        });
    } catch (error:any) {
      Alert.alert(error.name, error.message);
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Đăng ký</Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={values => signUp(values)}>
          {props => (
            <View style={styles.view2}>
              <View>
                <Text style={styles.text2}>Bạn là người mới ?</Text>
              </View>
              <View style={styles.view6}>
                <TextInput
                  style={styles.input1}
                  placeholder="Số điện thoại"
                  onChangeText={props.handleChange('phone_number')}
                  keyboardType="number-pad"
                  autoFocus={true}
                  value={props.values.phone_number}
                />
              </View>
              <View style={styles.view6}>
                <TextInput
                  style={styles.input1}
                  placeholder="Tên"
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
              </View>
              <View style={styles.view6}>
                <TextInput
                  style={styles.input1}
                  placeholder="Họ"
                  autoFocus={false}
                  onChangeText={props.handleChange('family_name')}
                  value={props.values.family_name}
                />
              </View>
              <View style={styles.view6}>
                <TextInput
                  style={styles.input1}
                  placeholder="Tuổi"
                  autoFocus={false}
                  keyboardType="number-pad"
                  onChangeText={props.handleChange('age')}
                  value={props.values.age}
                />
              </View>
              <View style={styles.view10}>
                <View>
                  <EmailIcon />
                </View>
                <View style={styles.view11}>
                  <TextInput
                    style={styles.input4}
                    placeholder="Email"
                    autoFocus={false}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                </View>
              </View>
              <View style={styles.view14}>
                <Animatable.View
                  animation={passwordFocussed ? 'fadeInRight' : 'fadeInLeft'}
                  duration={400}>
                  <LockIcon />
                </Animatable.View>
                <TextInput
                  style={{flex: 1}}
                  placeholder="Mật khẩu"
                  onFocus={() => {
                    setPasswordFocussed(true);
                  }}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  secureTextEntry={true}
                />
              <View style={{right: 10}}>
                <VisibilityOffIcon />
              </View>
              </View>
              <View style={styles.view15}>
                <Text style={styles.text3}>
                  {' '}
                  Bằng cách tạo hoặc đăng nhập vào tài khoản, bạn
                </Text>
                <View style={styles.view16}>
                  <Text style={styles.text3}>đồng ý với</Text>
                  <Text style={styles.text4}> Điều khoản & Điều kiện</Text>
                  <Text style={styles.text3}> và</Text>
                </View>
                <Text style={styles.text4}>
                  Tuyên bố về quyền riêng tư của chúng tôi
                </Text>
              </View>
              <View style={styles.view17}>
                <Button
                  title="Tạo tài khoản"
                  buttonStyle={styles.button1}
                  titleStyle={styles.title1}
                  onPress={() => props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.view18}>
          <Text style={styles.text5}>Hoặc</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text5}>Bạn đã có tài khoản ?</Text>
          </View>
          <View style={styles.view21}>
            <Button
              title="Đăng nhập"
              buttonStyle={styles.button2}
              titleStyle={styles.title2}
              onPress={() => navigationRef.current.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 22,
    color: colors.buttons,
    fontWeight: 'bold',
  },
  view2: {
    justifyContent: 'flex-start',
    borderStartColor: colors.white,
    paddingHorizontal: 20,
  },
  view3: {
    marginTop: 5,
    marginBottom: 10,
  },
  text2: {
    fontSize: 15,
    color: colors.grey2,
  },
  view4: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
  },
  view5: {
    marginLeft: 30,
    marginTop: 20,
  },
  input1: {
    fontSize: 16,
  },
  view6: {
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  view7: {
    marginLeft: 0,
    maxWidth: '65%',
  },
  input2: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
  },
  view8: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  view9: {
    marginLeft: 0,
    maxWidth: '65%',
  },
  input3: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
  },
  view10: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  view11: {
    marginLeft: 30,
    maxWidth: '65%',
  },
  input4: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10,
  },
  view13: {
    flexDirection: 'row',
    height: 40,
  },
  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.grey4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 20,
  },
  view15: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text3: {
    fontSize: 13,
  },
  view16: {
    flexDirection: 'row',
  },
  text4: {
    textDecorationLine: 'underline',
    color: colors.lightGreen,
    fontSize: 13,
  },
  button1: {
    backgroundColor: colors.buttons,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  title1: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  view17: {
    marginVertical: 10,
    marginTop: 30,
  },
  view18: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text5: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  view19: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  view20: {
    marginTop: 5,
  },
  view21: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  button2: {
    backgroundColor: colors.cardBackground,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 40,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  title2: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
