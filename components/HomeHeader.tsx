/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, parameters } from '../global/style';
import MenuIcon from '../assets/icons/menu.svg';

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <MenuIcon />
      <Text
        style={{
          color: colors.cardBackground,
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 95,
        }}>
        SalonApp
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
  },
});
