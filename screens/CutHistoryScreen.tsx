/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axiosClient from '../apis/axiosClient';
import {selectUserId} from '../redux/features/userSlice';
import {AirbnbRating} from 'react-native-elements';
import {navigationRef} from '../navigation/NavigationService';

interface Comment {
  _id: string;
  comment: string;
  createdAt: string;
}

interface Appointment {
  address: string;
  time: string;
  stylistName: string;
  serviceName: string;
  money: number;
  salonId: string;
  stylistId: string;
  id: number;
  status: number;
}

const CutHistoryScreen: React.FC = () => {
  const userId = useSelector(selectUserId) as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [salonRating, setSalonRating] = useState<number>(0);
  const [stylistRating, setStylistRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [salonId, setSalonId] = useState<string>('');
  const [stylistId, setStylistId] = useState<string>('');
  const [commented, setCommented] = useState<Comment[]>([]);

  useEffect(() => {
    axiosClient
      .get(`/comments/${userId}/user`)
      .then((data: any) => {
        if (data) {
          setCommented(data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axiosClient
      .get(`/appointments/${userId}/user`)
      .then((data: any) => {
        setAppointments(
          data.filter((appointment: Appointment) => appointment.status === 2),
        );
      })
      .catch(err => console.log(err));
  }, []);

  const CommentList: React.FC = () => {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
          Comments
        </Text>
        {commented.map(cm => (
          <View key={cm._id} style={{marginBottom: 10}}>
            <Text style={{fontSize: 16}}>{cm.comment}</Text>
            <Text style={{fontSize: 12, color: '#666', marginTop: 5}}>
              Posted on {new Date(cm.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({item}: {item: Appointment}) => {
    return (
      <View style={styles.appointmentContainer}>
        <Text style={styles.appointmentText}>Address: {item.address}</Text>
        <Text style={styles.appointmentText}>Time: {item.time}</Text>
        <Text style={styles.appointmentText}>Stylist: {item.stylistName}</Text>
        <Text style={styles.appointmentText}>Service: {item.serviceName}</Text>
        <Text style={styles.appointmentText}>Price: {item.money}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (appointments.length > 0) {
      setSalonId(appointments[0].salonId);
      setStylistId(appointments[0].stylistId);
    }
  }, [appointments]);

  const handleSubmit = () => {
    // TODO: send salonRating and stylistRating to server
    axiosClient
      .post('/comments', {
        salonId: salonId,
        stylistId: stylistId,
        userId: userId,
        comment: comment,
        stylistStars: stylistRating,
        salonStars: salonRating,
      })
      .then((data: any) => {
        if (data.newComment) {
          setTimeout(() => {
            navigationRef.current.goBack();
          }, 1000);
        }
      });
  };

  return (
    <FlatList
      contentContainerStyle={styles.scrollContainer}
      data={[{ key: 'content' }]}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>
              Mời anh đánh giá chất lượng phục vụ
            </Text>
            <Text style={styles.ratingTitle}>
              Phản hồi của anh sẽ giúp chúng em cải thiện chất lượng dịch vụ tốt hơn
            </Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Salon:</Text>
              <AirbnbRating size={35} count={5} onFinishRating={setSalonRating} />
            </View>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Stylist:</Text>
              <AirbnbRating
                size={35}
                count={5}
                onFinishRating={setStylistRating}
              />
            </View>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Comment:</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Anh chị cho chúng em xin góp ý về trải nghiệm dùng dịch vụ để chúng em cải thiện thêm ạ."
                onChangeText={setComment}
                value={comment}
                multiline
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>LƯU ĐÁNH GIÁ</Text>
            </TouchableOpacity>
          </View>
          {
            commented.length > 0 && (
            <>
              <CommentList />
              <View style={styles.appointmentContainer}>
                <Text style={styles.appointmentTitle}>Appointment Details:</Text>
                <FlatList
                  data={appointments}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItem} />
              </View>
            </>
            )
          }
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 30,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingLabel: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  appointmentContainer: {
    marginBottom: 10,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  commentInput: {
    height: 80,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default CutHistoryScreen;
