/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectLocation } from '../redux/features/locationSlice';
import { RootStackParamList } from '../Types';

interface Props {
  location: any
  listSalons: RootStackParamList['Salon'][]
  selectedSalon: RootStackParamList['Salon'] | null
  onSalonSelect: (salon: RootStackParamList['Salon']) => void
}

const SalonPicker: React.FC<Props> = ({ listSalons, selectedSalon, onSalonSelect }) => {
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const location = useSelector(selectLocation);

  const handleRegionChange = (region: Region) => {
    setMapRegion(region);
  };

  const handleMarkerPress = (salon: RootStackParamList['Salon']) => {
    onSalonSelect(salon);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        region={mapRegion}
        onRegionChange={handleRegionChange}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
        {listSalons.map(salon => (
          <Marker
            key={salon._id}
            coordinate={{
              latitude: salon.latitude,
              longitude: salon.longitude,
            }}
            title={salon.name}
            description={salon.address}
            onPress={() => handleMarkerPress(salon)}
            pinColor={selectedSalon && selectedSalon._id === salon._id ? 'red' : 'blue'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default SalonPicker;
