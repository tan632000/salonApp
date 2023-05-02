import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import MyAccountScreen from '../screens/MyAccountScreen'
import BookingScreen from '../screens/BookingScreen'
import BookingSalonScreen from '../screens/BookingSalonScreen'
import CalendarIcon from '../assets/icons/calendar-account-outline.svg'
import HomeIcon from '../assets/icons/home.svg'
import ViewListIcon from '../assets/icons/view-list.svg'
import UserIcon from '../assets/icons/user.svg'

const ClientTabs = createBottomTabNavigator()
export default function RootClientTabs({ route }) {
  return (
    <ClientTabs.Navigator>
      <ClientTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <HomeIcon />,
          headerShown: false
        }}
      />
      <ClientTabs.Screen
        name="MyOrdersScreen"
        component={BookingScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: () => <ViewListIcon />,
          headerShown: false
        }}
      />
      <ClientTabs.Screen
        name="BookingSalonScreen"
        component={BookingSalonScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Đặt lịch',
          tabBarIcon: () => (
            <CalendarIcon />
          ),
        }}
      />
      <ClientTabs.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          tabBarLabel: 'Tài khoản của tôi',
          tabBarIcon: () => <UserIcon />,
          headerShown: false
        }}
      />
    </ClientTabs.Navigator>
  )
}
