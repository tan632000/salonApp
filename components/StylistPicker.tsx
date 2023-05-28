/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import axiosClient from '../apis/axiosClient';

interface Stylist {
  _id: string;
  name: string;
  phoneNumber: string;
  photo: string;
  avgStylistStars: number;
}

interface StylistPickerProps {
  serviceId: string;
  selectedStylist: Stylist | null;
  onStylistSelect: (stylist: Stylist) => void;
}

export default function StylistPicker({
  serviceId,
  selectedStylist,
  onStylistSelect,
}: StylistPickerProps) {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedStylist ? selectedStylist._id : null,
  );

  useEffect(() => {
    console.log('serviceId', serviceId);
    axiosClient
      .get(`/stylists?serviceId=${serviceId}`)
      .then((data) => {
        if (Array.isArray(data)) {
          setStylists(data);
        } else {
          console.log('Invalid response from server', data);
        }
      })
      .catch(err => console.log(err));
  }, [serviceId]);

  const handleStylistPress = (stylist: Stylist) => {
    if (typeof onStylistSelect === 'function') {
      setSelectedId(stylist._id);
      onStylistSelect(stylist);
    } else {
      console.log('onStylistSelect is not a function');
    }
  };

  function StarRating({rating}: {rating: number}) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const starIcons = {
      full: '★',
      half: '½',
      empty: '☆',
    };

    return (
      <View style={styles.starRating}>
        {Array(fullStars)
          .fill(starIcons.full)
          .map((icon, index) => (
            <Text key={`full-${index}`} style={styles.star}>
              {icon}
            </Text>
          ))}
        {halfStar ? <Text style={styles.star}>{starIcons.half}</Text> : null}
        {Array(emptyStars)
          .fill(starIcons.empty)
          .map((icon, index) => (
            <Text key={`empty-${index}`} style={styles.star}>
              {icon}
            </Text>
          ))}
      </View>
    );
  }

  return (
    <View>
      {stylists ?
        stylists.map(stylist => (
          <TouchableOpacity
            key={stylist._id}
            style={
              selectedId === stylist._id ? styles.selected : styles.stylist
            }
            onPress={() => handleStylistPress(stylist)}>
            <Image source={{uri: stylist.photo}} style={styles.photo} />
            <View style={styles.details}>
              <Text style={styles.name}>{stylist.name}</Text>
              <Text style={styles.phoneNumber}>{stylist.phoneNumber}</Text>
              <StarRating rating={stylist.avgStylistStars} />
            </View>
          </TouchableOpacity>
        ))
        : (
          <Text>Stylist is busy now. Please choose an other.</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  stylist: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  phoneNumber: {
    color: '#666666',
    fontSize: 14,
  },
  starRating: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
  },
});
