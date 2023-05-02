/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/Header';
import axiosClient from '../apis/axiosClient';
import { navigationRef } from '../navigation/NavigationService';
import { useSelector } from 'react-redux';
import { selectLocation } from '../redux/features/locationSlice';
import MapSearchIcon from '../assets/icons/map-search.svg';

interface Salon {
  _id: number
  name: string
  address: string
  latitude: number
  longitude: number
}

export default function SalonSysttomScreen(): JSX.Element {
  const [mapSearch, setMapSearch] = useState<boolean>(false);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [listSalons, setListSalons] = useState<Salon[]>([]);
  const location = useSelector(selectLocation);

  useEffect(() => {
    axiosClient
      .get('/locations')
      .then(({ data }) => {
        setListSalons(data);
      })
      .catch(error => {
        console.error(error);
        setListSalons([]);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get(`/locations/${location.latitude}/${location.longitude}`)
      .then(({ data }) => {
        setSalons(data);
      })
      .catch(error => {
        console.error(error);
        setSalons([]);
      });
  }, [location]);

  const renderSalonMarkers = (): JSX.Element[] => {
    return salons.map((salon: Salon, index: number) => {
      const { latitude, longitude, name } = salon;
      return <Marker key={index} coordinate={{ latitude, longitude }} title={name} />;
    });
  };

  const handleSearchSalonNearby = (): void => {
    setMapSearch(true);
  };

  const handleSalonPress = (salon: Salon): void => {
    navigationRef.current?.navigate('SalonDetail', { salon });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 30 }}>
        <Header title="Hệ Thống Salon" />
      </View>
      {mapSearch ? (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}>
            {renderSalonMarkers()}
          </MapView>
        </View>
      ) : (
        <View style={{ padding: 20, flexDirection: 'column' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: 'orange',
              justifyContent: 'space-around',
              padding: 8,
              borderRadius: 5,
            }}
            onPress={handleSearchSalonNearby}>
            <MapSearchIcon />
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>TÌM SALON GẦN BẠN</Text>
          </TouchableOpacity>
          <FlatList
            data={listSalons}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ padding: 20 }} onPress={() => handleSalonPress(item)}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
                <Text style={{ fontSize: 16 }}>{item.address}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      )}
    </View>
  );
}
