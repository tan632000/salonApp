/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react'
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native'
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker'
import { Picker } from '@react-native-picker/picker'
import axiosClient from '../apis/axiosClient'
import { useSelector } from 'react-redux'
import { selectUserId } from '../redux/features/userSlice'

interface Salon {
  _id: string
  name: string,
  address: string,
  phone: string
}

const BusinessConsoleScreeen: React.FC = () => {
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>()
  const [image, setImage] = useState<string>('')
  const [salons, setSalons] = useState<Salon[]>([])
  const userId = useSelector(selectUserId);

  useEffect(() => {
    axiosClient
      .get('/locations')
      .then(({ data }) => {
        setSalons(data)
      })
      .catch(error => {
        console.error(error)
        setSalons([])
      })
  }, [])

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
      if (response?.didCancel) {
        console.log('User cancelled image picker')
      } else if (response?.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImageUri = response?.assets?.[0]?.uri;
          if (selectedImageUri) {
            const fileName = selectedImageUri.split('/').pop();
            const imageType = response.assets[0].type;

            const formData = new FormData();
            formData.append('file', {
              uri: selectedImageUri,
              type: imageType,
              name: fileName,
            });
            formData.append('upload_preset', 'imageupload');

            const data = await fetch('https://api.cloudinary.com/v1_1/c-ng-ty-tnhh-cic-vi-t-nam-chapter/image/upload', {
              method: 'POST',
              body: formData,
            }).then(r => r.json());
            if (data.secure_url) {
              setImage(data.secure_url);
            }
          }
        } else {
          console.log('No image selected');
        }
      }
    })
  }

  const handleSubmit = () => {
    if (selectedSalon && image) {
      console.log('Salon:', selectedSalon)
      console.log('Image:', image)
      console.log('UserId:', userId);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.field}>
            <Text>Select a Salon:</Text>
            <Picker
              selectedValue={selectedSalon?._id}
              onValueChange={(itemValue: string) => {
                const selected = salons.find(s => s._id === itemValue)
                if (selected) {
                  setSelectedSalon(selected);
                } else {
                  setSelectedSalon(null);
                }
              }}>
              {salons.map(s => (
                <Picker.Item key={s._id} label={s.name} value={s._id} />
              ))}
            </Picker>
          </View>
          {selectedSalon && (
            <View style={styles.field}>
              <Text>Salon Information:</Text>
              <Text>{selectedSalon.name}</Text>
              <Text>{selectedSalon.address}</Text>
              <Text>{selectedSalon.phone}</Text>
              <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://res.cloudinary.com/c-ng-ty-tnhh-cic-vi-t-nam-chapter/image/upload/v1683033570/e1da691745c09a9ec3d1_akvkhs.jpg' }} style={styles.qrCode} />
              </View>
              {image && <Image source={{uri: image}} style={styles.qrCode} />}
              <Button title="Take Photo" onPress={pickImage} />
            </View>
          )}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    marginBottom: 20,
  },
  qrCode: {
    width: 300,
    height: 450,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default BusinessConsoleScreeen
