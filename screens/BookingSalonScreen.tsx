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
import { selectUserId, selectUsername } from '../redux/features/userSlice';
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
  const [bookingErrMessage, setBookingErrMessage] = useState('');
  const [bookedSalon, setBookedSalon] = useState([]);
  const userId = useSelector(selectUserId);
  const user = useSelector(selectUsername);

  useEffect(() => {
    axiosClient
      .get(`/appointments/${userId}/user`)
      .then((data: any) => {
        // Filter appointments by date
        const desiredDate = new Date();
        const filteredAppointments = data.filter((appointment: any) => {
          const appointmentDate = new Date(appointment.time);
          return (
            // appointmentDate.getDate() === desiredDate.getDate() &&
            appointmentDate.getMonth() === desiredDate.getMonth() &&
            appointmentDate.getFullYear() === desiredDate.getFullYear() &&
            appointment.status === 1
          );
        });
        setBookedSalon(filteredAppointments);
      })
      .catch(err => console.log(err));
  }, []);

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
    // Check if the appointment time is within the desired range
    const appointmentHour = selectedDate && selectedDate.getHours();
    if (appointmentHour && (appointmentHour > 7 && appointmentHour < 15)) {
      setBookingErrMessage('Vui lòng đặt lịch trong khoảng thời gian từ 8 đến 18 giờ. Mời bạn chọn lại thời gian.');
      return; // Exit the function to prevent the POST request
    }
    setBookingErrMessage('');
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
          setBookingSuccessMessage('Đặt lịch thành công');
          setTimeout(() => {
            navigationRef.current?.goBack();
          }, 3000);
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          const { data } = error.response;
          setBookingErrMessage(data.error);
        } else if (error.request) {
          // The request was made but no response was received
          setBookingErrMessage(error.request);
          // ...
        } else {
          // Something happened in setting up the request
          setBookingErrMessage(error.message);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {
        bookedSalon.length > 0 ? (
          <>
            <Text style={styles.heading}>Thông tin đặt lịch</Text>
            <Text style={styles.infoLabel}>Họ và tên khách hàng:</Text>
            <Text style={styles.infoText}>{user.firstName + ' ' + user.lastName}</Text>
            <Text style={styles.infoLabel}>Salon:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].salonName}</Text>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].address}</Text>
            <Text style={styles.infoLabel}>Thời gian:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].time.replace("T", " ").replace(/\.\d+/, "").replace("Z", "")}</Text>
            <Text style={styles.infoLabel}>Dịch vụ lựa chọn:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].serviceName}</Text>
            <Text style={styles.infoLabel}>Stylist đăng kí:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].stylistName}</Text>
            <Text style={styles.infoLabel}>Tổng số tiền dự đoán:</Text>
            <Text style={styles.infoText}>{bookedSalon[0].money} VNĐ</Text>
          </>
        ) : (
          <>
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
                    mode="datetime"
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
              {bookingErrMessage && <Text style={styles.errMessage}>{bookingErrMessage}</Text>}
            </ScrollView>
          </>
        )
      }
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
    marginBottom: 20,
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
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 5,
  },
  successMessage: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 10,
  },
  errMessage: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
});

export default BookingSalonScreen;
