/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, RouteProp } from '@react-navigation/native';
import { navigationRef } from '../navigation/NavigationService';
import { RootStackParamList } from '../Types';
import ArrowLeftIcon from '../assets/icons/arrow-left.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import axiosClient from '../apis/axiosClient';

type SalonDetailProps = RouteProp<RootStackParamList, 'SalonDetail'>

export default function SalonDetailScreen() {
  const route = useRoute<SalonDetailProps>();
  const [comments, setComments] = useState([]);
  const { salon } = route.params;
  const { _id, latitude, longitude, address, name, phone } = salon;

  useEffect(() => {
    axiosClient
    .get(`/comments/${_id}/salon`)
    .then((data: any) => {
      setComments(data);
    }).catch((err) => console.log(err));
  }, [_id]);

  const handleBooking = () => {
    navigationRef.current.navigate('BookingSalon', { salon });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigationRef.current.goBack()}>
            <ArrowLeftIcon />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>Quay lại</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={{ flex: 1, width: '100%', height: 300 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}>
          <Marker coordinate={{ latitude, longitude }} title={name} />
        </MapView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>{name}</Text>
          <Text style={{ fontSize: 16 }}>{address}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <PhoneIcon />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{phone}</Text>
          </View>
          {comments && comments.map((comment: any) => (
            <View key={comment._id} style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: comment.userId.photo }}
                  style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                />
                <Text style={{ fontWeight: 'bold' }}>{`${comment.userId.firstName} ${comment.userId.lastName}`}</Text>
              </View>
              <Text style={{ marginTop: 5 }}>{comment.comment}</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ marginRight: 5 }}>Rating:</Text>
                <Text>{comment.salonStars}</Text>
              </View>
              <Text style={{ marginTop: 5 }}>{comment.createdAt.replace("T", " ").replace(/\.\d+/, "").replace("Z", "")}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={handleBooking}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Đặt lịch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
