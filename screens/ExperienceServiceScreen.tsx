/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import Header from '../components/Header';
import { colors } from '../global/style';
import { RootStackParamList } from '../Types';

type Item = {
  name: string
  image: any
}

type ExperienceServiceScreenProps = RouteProp<RootStackParamList, 'ExperienceService'>

const ExperienceServiceScreen = () => {
  const route = useRoute<ExperienceServiceScreenProps>()
  const { data, item } = route.params
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={{ backgroundColor: colors.cardBackground }}
          data={JSON.parse(data)}
          keyExtractor={(item: Item, index: number) => index.toString()}
          ListHeaderComponent={
            <View style={{ paddingTop: 30 }}>
              <Header title={item} />
            </View>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Item; index: number }) => (
            <View style={{ padding: 20 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text
                  style={{
                    width: 8,
                    backgroundColor: 'orange',
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              </View>
              <Image
                source={item.image}
                style={{
                  width: '100%',
                  height: 300,
                  marginTop: 15,
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ExperienceServiceScreen;
