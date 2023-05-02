/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axiosClient from '../apis/axiosClient';
import {Picker} from '@react-native-picker/picker';

interface Service {
  _id: string;
  name: string;
}

interface Props {
  salonId: string;
  selectedService: Service | null;
  onServiceSelect: (service: Service | null) => void;
}

export default function ServicePicker({
  salonId,
  selectedService,
  onServiceSelect,
}: Props) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axiosClient
      .get<Service[]>(`/services/${salonId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.log('Invalid response from server', response);
        }
      })
      .catch(err => console.log(err));
  }, [salonId]);

  const handleServicePress = (service: Service) => {
    if (typeof onServiceSelect === 'function') {
      onServiceSelect(service);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedService || undefined}
        onValueChange={handleServicePress}
        style={styles.picker}>
        {services.map(service => (
          <Picker.Item key={service._id} label={service.name} value={service} />
        ))}
      </Picker>
      {selectedService && (
        <View style={styles.selectedServiceContainer}>
          <Text style={styles.selectedServiceText}>
            Bạn đã chọn dịch vụ: {selectedService.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  picker: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 20,
  },
  selectedServiceContainer: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 10,
  },
  selectedServiceText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});
