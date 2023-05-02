/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsername, removeUser } from '../redux/features/userSlice';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar, Switch } from 'react-native-elements';
import { colors } from '../global/style';
import HeartIcon from '../assets/icons/tag-heart.svg';
import CreditCardIcon from '../assets/icons/credit-card-outline.svg';
import LogoutIcon from '../assets/icons/logout-variant.svg';
import CogOutlineIcon from '../assets/icons/cog-outline.svg';
import LifeBuoyIcon from '../assets/icons/lifebuoy.svg';

export default function DrawerElement(props: any) {
  const user = useSelector(selectUsername);
  const dispatch = useDispatch();
  function signOut() {
    try {
      dispatch(removeUser());
    } catch (error: any) {
      Alert.alert(error.code);
    }
  }
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: colors.buttons }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
              paddingVertical: 10,
            }}>
            <Avatar rounded avatarStyle={styles.avatar} source={{uri: user.photo}} size={75} />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: colors.cardBackground,
                }}>
                {user.firstName + ' ' + user.lastName}
              </Text>
              <Text style={{ fontSize: 14, color: colors.cardBackground }}>{user.email}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.cardBackground,
                    fontSize: 18,
                  }}>
                  1
                </Text>
                <Text style={{ color: colors.cardBackground, fontSize: 14 }}>My favorites</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.cardBackground,
                    fontSize: 18,
                  }}>
                  0
                </Text>
                <Text style={{ color: colors.cardBackground, fontSize: 14 }}>My Cart</Text>
              </View>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Payment"
          icon={() => <CreditCardIcon />}
          onPress={() => {
            console.log(1111);
          }}
        />
        <DrawerItem
          label="Promotions"
          icon={() => <HeartIcon />}
          onPress={() => {
            console.log(1111);
          }}
        />
        <DrawerItem
          label="Settings"
          icon={() => <CogOutlineIcon />}
          onPress={() => {
            console.log(1111);
          }}
        />
        <DrawerItem
          label="Help"
          icon={() => <LifeBuoyIcon />}
          onPress={() => {
            console.log(1111);
          }}
        />
        <View style={{ borderRadius: 1, borderTopColor: colors.grey5 }}>
          <Text style={styles.preferences}>References</Text>
          <View style={styles.switchText}>
            <Text style={styles.darkThemeText}>Dark Theme</Text>
            <View style={{ paddingRight: 10 }}>
              <Switch trackColor={{ false: '#81b0ff' }} thumbColor="#f4f3f4" />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Sign out"
        icon={() => <LogoutIcon />}
        onPress={() => {
          console.log(1111);
          signOut();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -5,
  },
  avatar: {
    borderWidth: 4,
    borderColor: colors.cardBackground,
  },
  preferences: {
    fontSize: 16,
    color: colors.grey2,
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10,
  },
  darkThemeText: {
    fontSize: 16,
    color: colors.grey2,
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
});
