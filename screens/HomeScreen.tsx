/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  StatusBar,
} from 'react-native';
import {colors} from '../global/style';
import HomeHeader from '../components/HomeHeader';
import {experienceServices, specialProducts} from '../global/data';
import {navigationRef} from '../navigation/NavigationService';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {setLocation} from '../redux/features/locationSlice';
import ArrowRightThinIcon from '../assets/icons/arrow-right-thin.svg';
import ContentCutIcon from '../assets/icons/content-cut.svg';
import GoldIcon from '../assets/icons/gold.svg';
import HistoryIcon from '../assets/icons/history.svg';
import KeyboardOutlineIcon from '../assets/icons/keyboard-outline.svg';
import PlaceIcon from '../assets/icons/map-search.svg';
import CalendarIcon from '../assets/icons/calendar-account-outline.svg';
import GreaterIcon from '../assets/icons/greater.svg';
import WebIcon from '../assets/icons/web.svg';
import AccountGroupOutlineIcon from '../assets/icons/account-group-outline.svg';
import SaleIcon from '../assets/icons/point-of-sale.svg';
import StarOutlineIcon from '../assets/icons/star-outline.svg';

export default function HomeScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [indexCheck] = useState<string>('0');

  useEffect(() => {
    let isMounted = true;
    try {
      Geolocation.getCurrentPosition(position => {
        if (isMounted) {
          dispatch(
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
        }
      });
    } catch (error) {
      console.error('error', error);
      // or display an error message to the user
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"  
        backgroundColor="rgba(255,140,82,1)"
      />
      <HomeHeader />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={
          <>
            <View style={{flex: 1, borderRadius: 20, padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  marginBottom: 20,
                }}>
                <Pressable
                  onPress={() => {
                    navigationRef.current.navigate('BookingSalon');
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={styles.smallCard}>
                      <CalendarIcon />
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        width: 70,
                        alignContent: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      Đặt lịch
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    navigationRef.current.navigate('CutHistory');
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={styles.smallCard}>
                      <HistoryIcon style={{width: 15, height: 15}} />
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        width: 70,
                        alignContent: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      Lịch sử cắt
                    </Text>
                  </View>
                </Pressable>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.smallCard}>
                    <KeyboardOutlineIcon />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      width: 70,
                      alignContent: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    Bảng giá
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.smallCard}>
                    <SaleIcon />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      width: 70,
                      alignContent: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    Ưu đãi
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.smallCard}>
                    <AccountGroupOutlineIcon />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      width: 70,
                      alignContent: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    Member
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    navigationRef.current.navigate('SalonSysttom');
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={styles.smallCard}>
                      <WebIcon />
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        width: 70,
                        alignContent: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      Hệ thống Salon
                    </Text>
                  </View>
                </Pressable>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.smallCard}>
                    <GoldIcon />
                  </View>
                  <Text
                    style={{fontSize: 12, width: 70, flex: 1, textAlign: 'center'}}>
                    Đặc quyền Gold
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.smallCard}>
                    <ContentCutIcon />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      width: 70,
                      alignContent: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    Bí kíp chăm sóc tóc
                  </Text>
                </View>
              </View>
            </View>
            <Pressable
              onPress={() => navigationRef.current.navigate('CutHistory')}>
              <View style={{flex: 1, backgroundColor: colors.grey5, padding: 20, borderRadius: 20, marginLeft: 20, marginRight: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/avatar.jpg')}
                    style={{width: 55, height: 55, borderRadius: 5}}
                  />
                  <View style={{flex: 1, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>
                      Mời anh chị đánh giá chất lượng phục vụ
                    </Text>
                    <Text style={{fontSize: 12, marginTop: 5}}>
                      Phản hồi của anh chị sẽ giúp chúng em cải thiện chất lượng
                      dịch vụ tốt hơn
                    </Text>
                    <Pressable style={{flex: 1, flexDirection: 'row'}}>
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center'}}>Trải nghiệm dịch vụ</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View style={{paddingTop: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center'}}>Top sản phẩm nổi bật</Text>
            </View>
            <View style={{padding: 20}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={specialProducts}
                keyExtractor={item => item.id}
                extraData={indexCheck}
                renderItem={({item}) => (
                  <Pressable>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginRight: 15,
                        width: 160,
                        backgroundColor: colors.cardBackground,
                      }}>
                      <Image
                        style={{height: 120, width: '100%', resizeMode: 'cover'}}
                        source={item.image}
                      />
                      <View style={{height: 45, padding: 5}}>
                        <Text style={styles.smallCardText}>{item.name}</Text>
                      </View>
                      <View style={{padding: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {item.price}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: 'orange',
                          justifyContent: 'space-evenly',
                          height: 40,
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>
                          MUA NGAY
                        </Text>
                        <ArrowRightThinIcon />
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </>
        }
        data={experienceServices}
        keyExtractor={item => item.id}
        extraData={indexCheck}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigationRef.current.navigate('ExperienceService', {
                item: item.name,
                data: JSON.stringify(item.data),
              });
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15, paddingHorizontal: 20}}>
              <Image source={item.image} style={{width: 70, height: 70}} />
              <View style={{flex: 1, marginLeft: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 12, marginTop: 5}}>
                  {item.content}
                </Text>
              </View>
              <Pressable>
                <GreaterIcon />
              </Pressable>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.floatButton}>
        <TouchableOpacity
          onPress={() => {
            navigationRef.current.navigate('SalonSysttom');
          }}>
          <PlaceIcon />
          <Text style={{color: colors.grey2}}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  addressView: {
    flexDirection: 'row',
    backgroundColor: colors.grey5,
    borderRadius: 15,
    paddingVertical: 6,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  clockView: {
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    marginLeft: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  headerType: {
    backgroundColor: colors.grey5,
    paddingVertical: 3,
    marginTop: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    color: colors.grey2,
  },
  smallCard: {
    borderRadius: 20,
    backgroundColor: colors.grey5,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 15,
    width: 60,
    margin: 10,
    height: 60,
  },
  smallCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    width: 80,
    margin: 10,
    height: 100,
  },
  smallCardText: {
    fontWeight: 'bold',
    color: colors.grey2,
    fontSize: 12,
    textAlign: 'center',
  },
  smallCardTextSelected: {
    fontWeight: 'bold',
    color: colors.cardBackground,
    fontSize: 12,
    textAlign: 'center',
  },
  floatButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: '#fff',
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
  },
});
