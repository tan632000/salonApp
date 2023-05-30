import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import RootClientTabs from './ClientTabs'
import BusinessConsoleScreen from '../screens/BusinessConsoleScreeen'
import DrawerElement from '../components/DrawerElement'
import HomeIcon from '../assets/icons/home.svg'
import BusinessIcon from '../assets/icons/business.svg'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerElement {...props} />}>
      <Drawer.Screen
        name="RootClientTabs"
        component={RootClientTabs}
        options={({ route }) => ({
          title: 'Khách hàng',
          headerShown: false,
          drawerIcon: () => (
            <HomeIcon />
          ),
        })}
      />
      <Drawer.Screen
        name="BusinessConsoleScreen"
        component={BusinessConsoleScreen}
        options={({ route, navigation }) => ({
          title: 'Kích hoạt dịch vụ',
          drawerIcon: ({ focussed, size }) => (
            <BusinessIcon />
          ),
        })}
      />
    </Drawer.Navigator>
  )
}
