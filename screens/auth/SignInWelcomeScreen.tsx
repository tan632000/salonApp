/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {colors} from '../../global/style';
import {navigationRef} from '../../navigation/NavigationService';

const SignInWelcomeScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.text}>KHÁM PHÁ SALON</Text>
        <Text style={styles.text}>TRONG KHU VỰC CỦA BẠN</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Swiper autoplay={true}>
          <View style={styles.slide1}>
            <Image
              source={require('../../assets/salon1.jpg')}
              style={{flex: 1, width: 400, height: 250, resizeMode: 'cover'}}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              source={require('../../assets/salon2.jpg')}
              style={{flex: 1, width: 400, height: 250, resizeMode: 'cover'}}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              source={require('../../assets/salon3.jpg')}
              style={{flex: 1, width: 400, height: 250, resizeMode: 'cover'}}
            />
          </View>
        </Swiper>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Button
            title="ĐĂNG NHẬP"
            buttonStyle={styles.styledButton}
            titleStyle={styles.buttonTitle}
            onPress={() => {
              navigationRef.current.navigate('SignIn');
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <Button
            title="TẠO TÀI KHOẢN"
            buttonStyle={styles.createButton}
            titleStyle={styles.createTitle}
            onPress={() => navigationRef.current.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.buttons,
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  createButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#ff8c52',
    paddingHorizontal: 20,
    color: 'black',
  },
  createTitle: {
    color: colors.grey1,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});

export default SignInWelcomeScreen;
