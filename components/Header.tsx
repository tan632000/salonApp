/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { colors, parameters } from '../global/style'
import { navigationRef } from '../navigation/NavigationService'
import ArrowLeft from '../assets/icons/arrow-left.svg';

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={{ marginLeft: 20 }}>
        <Pressable onPress={() => {
            navigationRef.current?.goBack();
          }}>
          <ArrowLeft />
        </Pressable>
      </View>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    alignItems: 'center',
  },
  headerText: {
    color: colors.headerText,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 30,
  },
})
