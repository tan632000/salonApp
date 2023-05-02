/* eslint-disable prettier/prettier */
import {Key} from 'react';
export type RootStackParamList = {
  Salon: {
    _id: Key | null | undefined,
    name: string,
    address: string,
    phone: string,
    latitude: number,
    longitude: number
  },
  SignInWelcome: undefined,
  SignIn: undefined,
  SignUp: undefined,
  DrawerNavigator: undefined,
  ExperienceService: {
    data: any;
    item: string;
  },
  CutHistory: undefined,
  SalonSysttom: undefined,
  SalonDetail: {
    salon: any
  }
  BookingSalon: {
    salon: any
  }
};
