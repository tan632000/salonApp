/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { useRoute, RouteProp } from '@react-navigation/native';
import axiosClient from '../apis/axiosClient';
import SalonPicker from '../components/SalonPicker';
import ServicePicker from '../components/ServicePicker';
import StylistPicker from '../components/StylistPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import { selectLocation } from '../redux/features/locationSlice';
import { selectUserId } from '../redux/features/userSlice';
import { navigationRef } from '../navigation/NavigationService';
import { RootStackParamList } from '../Types';

type BookingSalonProps = RouteProp<RootStackParamList, 'BookingSalon'>

const BookingSalonScreen = () => {
  const router = useRoute<BookingSalonProps>();
  const salon = router.params?.salon || undefined;

  const [listSalons, setListSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStylist, setSelectedStylist] = useState<any>(null);
  const [userNotes, setUserNotes] = useState('');
  const location = useSelector(selectLocation);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');
  const userId = useSelector(selectUserId);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const updateDate = new Date(date);
    updateDate.setHours(updateDate.getHours() + 7);
    setSelectedDate(updateDate);
    hideDatePicker();
  };

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

  const handleFinishBooking = () => {
    // Handle booking logic here
    axiosClient
      .post('/appointments', {
        salonId: selectedSalon._id,
        stylistId: selectedStylist._id,
        serviceId: selectedService._id,
        userId: userId,
        time: selectedDate,
        note: userNotes,
        duration: selectedService.duration,
        status: 1,
      })
      .then((data: any) => {
        if (data.appointment) {
          setBookingSuccessMessage('Booking successful!');
          setTimeout(() => {
            navigationRef.current?.goBack();
          }, 3000);
        }
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <Text style={styles.heading}>Đặt lịch</Text>
        <Text style={styles.label}>1. Chọn Salon</Text>
        <SalonPicker
          location={location}
          listSalons={listSalons}
          selectedSalon={salon || selectedSalon}
          onSalonSelect={setSelectedSalon}
        />

        {selectedSalon && (
          <>
            <Text style={styles.label}>2. Chọn dịch vụ</Text>
            <ServicePicker
              salonId={selectedSalon._id}
              selectedService={selectedService}
              onServiceSelect={setSelectedService}
            />
          </>
        )}

        {selectedService && (
          <>
            <Text style={styles.label}>3. Chọn Stylist và thời gian</Text>
            <StylistPicker
              serviceId={selectedService._id}
              selectedStylist={selectedStylist}
              onStylistSelect={setSelectedStylist}
            />
            <Button title="Chọn Thời gian" onPress={showDatePicker} />
            {selectedDate && (
              <Text style={styles.selectedDate}>
                Thời gian bạn chọn: {selectedDate.toLocaleString('vi-VN', { timeZone: 'UTC' })}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={styles.label}>Ghi chú:</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Nhập ghi chú của bạn"
              value={userNotes}
              onChangeText={setUserNotes}
            />
          </>
        )}

        {selectedStylist && selectedDate && (
          <Button
            title="Hoàn tất đặt lịch"
            onPress={handleFinishBooking}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
          />
        )}
        {bookingSuccessMessage && <Text style={styles.successMessage}>{bookingSuccessMessage}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  divider: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  selectedDate: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    marginBottom: 50,
  },
  notesInput: {
    height: 80,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  successMessage: {
    textAlign: 'center',
    color: 'green',
  },
});

export default BookingSalonScreen;
