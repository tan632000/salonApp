/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {selectUserId, selectUserToken, selectUsername, setUser} from '../redux/features/userSlice';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import axiosClient from '../apis/axiosClient';

const MyAccountScreen = () => {
  const user = useSelector(selectUsername);
  const token = useSelector(selectUserToken);
  const [photo, setPhoto] = useState(user.photo);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age?.toString());
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber?.toString());
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateProfile = () => {
    // Implement logic to update user profile here
    axiosClient.put(`/users/${userId}`, {
      firstName,
      lastName,
      email,
      age,
      phoneNumber,
      photo,
    }).then((data:any) => {
      if (data) {
        setSuccessMessage('You have updated your info successfully.');
        dispatch(
          setUser({
            name: data,
            role: data.isAdmin === true ? 'Admin' : 'User',
            token: token,
            userId: data._id,
          }),
        );
      }
    }).catch(err => console.log(err));
  };

  const handleChangePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
      if (response?.didCancel) {
        console.log('User cancelled image picker');
      } else if (response?.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
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
              setPhoto(data.secure_url);
            }
          }
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image source={{uri: photo}} style={styles.photo} />
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
            {successMessage.length > 0 && <Text>{successMessage}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={age}
            keyboardType={'numeric'}
            onChangeText={(text) => setAge(parseInt(text))}
          />
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            value={phoneNumber?.toString()}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // make sure the ScrollView expands to fill the screen
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    alignItems: 'center',
  },
  photo: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  changePhotoText: {
    color: 'blue',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
