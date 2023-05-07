/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const { width } = Dimensions.get('window');

  const renderItem = ({ item }: { item: string }) => {
    return <Image source={{ uri: item }} style={styles.image} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        snapToAlignment='center'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain',
  },
});
